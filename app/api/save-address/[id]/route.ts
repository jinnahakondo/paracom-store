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
        const { address } = await req.json();
        console.log(address);
        const { id } = await params;
        const result = await Address.findOneAndUpdate(
            {
                user: user.id,
                _id: id
            },
            { $set: address },
            { returnDocument: 'after' }
        )

        if (!result) {
            return response.error({
                message: "Address not found!",
                status:404
            });
        }

        return response.success({
            message: 'Address Updated',
            data: result,
        })

    } catch (error: any) {
        return response.error({
            message: "failed to update address!",
            error: error.message,
        })
    }
}