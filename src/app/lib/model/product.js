import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name: String,
  amount: String,
  dob: String,
  duration: String,
  gender: String,
  offer: String,
  offerStatus: String,
  rate: String,
  review: String,
});
export const Product = mongoose.models.calls || mongoose.model("calls",productModel);