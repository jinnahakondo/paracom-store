import { connectDb } from "@/lib/db/db";
import User from "@/schemas/user.schema";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // db connection 
                await connectDb()

                // find user 
                const user = await User.findOne({ email: credentials?.email }).select("+password")
                if (!user) {
                    throw new Error("Invalid credentials")
                }

                // compare password
                const isPasswordMatched =
                    await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordMatched) {
                    throw new Error("Invalid credentials")
                }

                // success login
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "google") {
                    await connectDb();

                    const existingUser = await User.findOne({
                        email: user.email,
                    });

                    if (!existingUser) {
                        await User.create({
                            provider: "google",
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            role: "user",
                        });
                    }
                }

                return true;
            } catch (error) {
                console.error("Google SignIn Error:", error);
                return false;
            }
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async jwt({ token, user, account }) {
            if (user) {
                if (account?.provider === "google") {
                    await connectDb();

                    const dbUser = await User.findOne({
                        email: user.email,
                    });

                    if (dbUser) {
                        token.role = dbUser.role;
                        token.email = dbUser.email;
                    }
                } else {
                    token.email = user.email;
                    token.role = user.role;
                }
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.email = token.email as string;
            }

            return session
        },
    }
    ,
    secret: process.env.NEXTAUTH_SECRET,
}