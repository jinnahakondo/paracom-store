import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Address from "@/schemas/addressSchema";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const { user } = verifyAuth();
        const { address } = await req.json();

        const result = await Address.create(address);
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
        const result = await Address.find()
    } catch (error) {

    }
}