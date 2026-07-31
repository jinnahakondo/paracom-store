import { verifyAuth } from "@/lib/auth/verifyAuth";
import { connectDb } from "@/lib/db/db";
import { response } from "@/lib/helperFunction";
import Address from "@/schemas/addressSchema";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDb();

        const { user } = await verifyAuth();

        // Fetch the specific default address for this user
        const address = await Address.findOne({
            user: user.id,
            isDefault: true,
        });

        // Handle case where address isn't found
        if (!address) {
            return response.error({
                message: "Default address not found",
                status: 404,
            });
        }

        return response.success({
            message: "Address fetched",
            data: address,
            status: 200,
        });

    } catch (error: any) {
        return response.error({
            message: "failed to get default address",
            error: error?.message,
            status: 500,
        });
    }
}