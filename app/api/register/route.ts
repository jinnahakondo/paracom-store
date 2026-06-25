
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import User from "@/schemas/user.schema";

export async function POST(req: Request) {
    try {
        await connectDb()

        const payload = await req.json()
        if (!payload.password) {
            throw new Error("password is required")
        }

        const user = await User.create(payload)
        return response.success({
            message: "User created successfully",
            data: user,
            status: 201,
        })
        
    } catch (error: any) {
        return response.error({
            message: "Failed to create user",
            status: 500,
            error: error.message
        })
    }
}