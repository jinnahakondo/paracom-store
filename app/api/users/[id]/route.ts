import { connectDb } from "@/lib/db/db";
import { isValidObjectId, response } from "@/lib/helperFunction";
import User from "@/schemas/user.schema";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

interface routeProps {
    params: Promise<{ id: string }>
}


//get a user by id
export async function GET(req: NextRequest, { params }: routeProps) {
    try {
        const { id } = await params

        if (!isValidObjectId(id)) {
            return response.error({
                message: "invalid user id",
                status: 400,
            });
        }

        await connectDb()

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

        if (!isValidObjectId(id)) {
            return response.error({
                message: "invalid user id",
                status: 400,
            });
        }


        const payload = await req.json()

        // if payload is empty 
        if (!Object.keys(payload).length) {
            return response.error({
                message: "update data is required",
                status: 400,
            });
        }

        const allowedUpdates = ['name', 'email', "password", 'image', "phone", "address"];

        // make update obj 
        const update: Record<string, unknown> = {};

        // filter allowed fields
        allowedUpdates.forEach(field => {
            if (payload[field] !== undefined) {
                update[field] = payload[field];
            }
        });

        // no valid field found
        if (!Object.keys(update).length) {
            return response.error({
                message: "no valid fields provided for update",
                status: 400,
            });
        }

        //has updated password
        if (update.password) {
            update.password = await bcrypt.hash(
                update.password as string,
                10
            );
        }

        await connectDb()

        const updatedUser = await User.findByIdAndUpdate(
            id,
            update,
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

        if (!isValidObjectId(id)) {
            return response.error({
                message: "invalid user id",
                status: 400,
            });
        }

        await connectDb()

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