import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Address from "@/schemas/addressSchema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { user } = await verifyAuth();
        const address = await req.json();

        const savedAddressCount = await Address.countDocuments({
            user: user.id
        })

        const newAddress = {
            user: user.id,
            ...address,
            isDefault: savedAddressCount === 0,
        }


        const result = await Address.create(newAddress);
        console.log(result);
        return response.success({
            message: "address saved",
            data: result,
        })

    } catch (error: any) {
        return response.error({
            message: "failed to save address",
            error: error.message
        })
    }
}

export async function GET() {
    try {
        await connectDb();
        const { user } = await verifyAuth();
        const result = await Address.find({
            user: user.id,
        })

        return response.success({
            message: "saved addresses got",
            data: result
        })

    } catch (error: any) {
        return response.error({
            message: "failed to get saved addresses",
            error: error.message,
        })
    }
}