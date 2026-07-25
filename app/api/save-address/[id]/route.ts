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
        const body = await req.json();
        const { id } = await params;
        const result = await Address.findOneAndUpdate(
            {
                user: user.id,
                id
            },
            { $set: body }
        )

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