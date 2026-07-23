import mongoose, { Schema, Document, Types } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  provider: "credentials" | "google";
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: "user" | "admin";
  phone?: string;
  address?: Types.ObjectId[];
  isModified(path: string): boolean;
}

const userSchema = new Schema<IUser>(
  {
    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    image: {
      type: String,
    },
    phone: String,
    address: [
      {
        type: Types.ObjectId,
        ref: "Address"
      },
    ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.provider !== "credentials") return;
  if (!this.password) return;
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

const User =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;