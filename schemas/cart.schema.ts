
import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },

        quantity: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

cartSchema.index(
    { user: 1, product: 1 },
    { unique: true }
)

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema)
export default Cart