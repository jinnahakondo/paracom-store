import { response } from "@/lib/helperFunction";
import User from "@/schemas/user.schema";
import { NextRequest } from "next/server";

interface routeProps {
    params: Promise<{ id: string }>
}


//get a user by id
export async function GET(req: NextRequest, { params }: routeProps) {
    try {
        const { id } = await params

        const user = await User.findById(id)

        if (!user) {
            return response.error({
                message: "user not found",
                status: 404
            })
        }

        return response.success({
            data: user,
            message: "user fetched successfully"
        })

    } catch (error: any) {
        return response.error({
            message: 'failed to fetch user',
            error: error.message
        })
    }
}

//update a user by id
export async function PATCH(req: NextRequest, { params }: routeProps) {
    try {
        const { id } = await params

        const payload = await req.json()

        const updatedUser = await User.findByIdAndUpdate(
            id,
            payload,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return response.error({
                message: "user not found",
                status: 404,
            });
        }

        return response.success({
            message: "user updated successfully",
            data: updatedUser
        })

    } catch (error: any) {
        return response.error({
            message: 'failed to update user',
            error: error.message
        })
    }
}


//delete a user by id
export async function DELETE(req: NextRequest, { params }: routeProps) {
    try {
        const { id } = await params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return response.error({
                message: "user not found",
                status: 404,
            });
        }

        return response.success({
            message: "user deleted successfull"
        })

    } catch (error: any) {
        return response.error({
            message: "failed to delete user",
            error: error.message
        })
    }
}

