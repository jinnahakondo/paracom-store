import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Address from "@/schemas/addressSchema";
import { NextRequest } from "next/server";

interface IParams {
    params: Promise<{ id: string }>
}


export async function PATCH(req: NextRequest, { params }: IParams) {
    try {
        await connectDb();
        const { user } = await verifyAuth();
        const { id } = await params;

        const body = await req.json().catch(() => null);
        if (!body || !body.address) {
            return response.error({
                message: "Invalid or missing address payload.",
                status: 400
            });
        }

        const { address } = body;
        // Sanitize: remove immutable/restricted keys
        delete address._id;
        delete address.user;

        const result = await Address.findOneAndUpdate(
            {
                user: user.id,
                _id: id
            },
            { $set: address },
            {
                returnDocument: 'after',
                runValidators: true // Enforces Mongoose schema validation on update
            }
        );

        if (!result) {
            return response.error({
                message: "Address not found!",
                status: 404
            });
        }

        return response.success({
            message: 'Address Updated',
            data: result,
        });

    } catch (error: any) {
        return response.error({
            message: "Failed to update address!",
            error: error.message,
            status: error.name === 'ValidationError' ? 400 : 500
        });
    }
}

export async function DELETE(_req: NextRequest, { params }: IParams) {
    try {
        await connectDb();
        const { user } = await verifyAuth();
        const { id } = await params;

        const result = await Address.findOneAndDelete({
            user: user.id,
            _id: id
        });

        if (!result) {
            return response.error({
                message: "Address not found!",
                status: 404
            });
        }

        return response.success({
            message: 'Address Deleted',
            data: result
        });
    } catch (error: any) {
        return response.error({
            message: "Failed to delete address",
            error: error.message,
            status: 500
        });
    }
}