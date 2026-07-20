import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: Number,
        price: Number,
        subtotal: Number
      },
    ],

    subtotal: Number,

    shippingFee: Number,

    totalAmount: Number,

    payment: {
      transactionId: String,
      paymentMethod: {
        type: String,
        enum: ["cash", "card"],
        default: 'card'
      },

      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
      },

    },

    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "packed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema)
export default Order