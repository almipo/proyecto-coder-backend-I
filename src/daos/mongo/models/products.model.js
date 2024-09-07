import { Schema, model } from "mongoose";

const collectionName='products'
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },

  stock: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  create: {
    type: Date,
    default: Date.now(),
  },
});


const productsModel = model (collectionName, productSchema )
export default productsModel