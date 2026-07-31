import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        division: { type: String, required: true },
        district: { type: String, required: true },
        city: { type: String, required: true },
        address: String,
        postalCode: String,
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);
export default Address;