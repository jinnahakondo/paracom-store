import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

        description: {
            type: String,
            required: true,
        },

        images: [String],

        price: {
            type: Number,
            required: true,
        },

        discountPrice: Number,

        stock: {
            type: Number,
            default: 0,
        },

        brand: String,

        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },

        averageRating: {
            type: Number,
            default: 0,
        },

        totalReviews: {
            type: Number,
            default: 0,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;