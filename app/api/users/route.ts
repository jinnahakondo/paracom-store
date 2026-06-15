import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import User from "@/schemas/user.schema";

export async function GET(req: Request) {
    try {
        await connectDb()
        const users = await User.find()
        return response.success({
            data: users,
            message: "users fetched successfully",
        })
    } catch (error: any) {
        return response.error({
            message: 'failed to fetch users',
            error: error.message
        })
    }
}