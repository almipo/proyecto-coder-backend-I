import { Schema, model } from "mongoose";

const collectionName = 'carts';

const cartSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
});

const cartModel = model(collectionName, cartSchema);
export default cartModel;
