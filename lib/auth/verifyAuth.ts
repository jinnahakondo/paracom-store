import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";


export async function verifyAuth() {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw new Error("UNAUTHORIZED");
    }

    return session;
}



export async function verifyRole(...roles: string[]) {
    const session = await verifyAuth();

    if (!roles.includes(session.user.role)) {
        throw new Error("FORBIDDEN");
    }

    return session;
}