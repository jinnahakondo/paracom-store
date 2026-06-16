
import { verifyRole } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { isValidId, response } from "@/lib/helperFunction";
import User from "@/schemas/user.schema";
import { NextRequest } from "next/server";

interface routeProps {
    params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, { params }: routeProps) {
    try {
        const { id } = await params

        if (!isValidId(id)) {
            return response.error({
                message: "invalid user id",
                status: 400,
            });
        }

        const role = await req.json()

        await verifyRole("admin")

        await connectDb()

        const updatedUser = await User.findByIdAndUpdate(
            id,
            role,
            { new: true, runValidators: true })

        if (!updatedUser) {
            return response.error({
                message: "user not found",
                status: 404,
            });
        }

        return response.success({
            message: "role updated successfully",
            data: updatedUser
        })

    } catch (error: any) {
        return response.error({
            message: "failed to update role",
            error: error.message
        });
    }
}