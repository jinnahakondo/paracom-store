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

export async function PATCH(req: NextRequest) {
    try {
        await connectDb();

        const { user } = await verifyAuth();
        const { addressId } = await req.json();

        if (!addressId) {
            return response.error(
                {
                    message: "Address ID is required",
                    status: 400
                },
            );
        }

        // Make all user's addresses non-default
        await Address.updateMany(
            { user: user.id },
            { $set: { isDefault: false } }
        );

        // Make the selected address the default
        const updatedAddress = await Address.findOneAndUpdate(
            {
                _id: addressId,
                user: user.id,
            },
            { $set: { isDefault: true } },
            { new: true }
        );

        if (!updatedAddress) {
            return response.error(
                {
                    message: "Address not found",
                    status: 404
                },
            );
        }

        return response.success(
            {
                message: "Default address updated successfully",
                data: updatedAddress,
                status: 200
            },
        );
    } catch (error) {
        console.error("Failed to update default address:", error);

        return response.error(
            {
                message: "Something went wrong",
                status: 500
            },

        );
    }
}