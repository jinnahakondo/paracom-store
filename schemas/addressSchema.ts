import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema({
    name: String,
    phone: String,
    division: String,
    district: String,
    city: String,
    address: String,
    postalCode: String,
})

const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);
export default Address;