import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact_no: Number
});

export default mongoose.model('seller', sellerSchema);
