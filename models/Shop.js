import mongoose from 'mongoose';
import User from './User';

const Shopmessages = new mongoose.Schema(
  { 
    isViewed : { type: Boolean, required: true, default: false },
    isProduct : { type: Boolean, required: true, default: false },
    isOrder : { type: Boolean, required: true, default: false },
    isCasual : { type: Boolean, required: true, default: false },
    title : { type: String, required: true},
    message : { type: String, required: true},
    product : { type: Array },
    order : { type: Array },
    productLink: { type: String },
    orderLink : { type: String },
  },
  {
    timestamps: true,
  }
);
 
const shopSchema = new mongoose.Schema(
  { 
    shopName: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    coverPhoto: { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderedItems: [
      { 
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        size: { type:Number, required: true },
        image: { type: Array, required: true },
        price: { type: Number, required: true },
        productId: { type: String, required: true },
        checked: { type: Boolean, required: true, default: false },
        confirmed: { type: Boolean, required: true, default: false },
      },
    ],
    ratings: { type: Number, required: true, default: 4.5 },
    message: [Shopmessages],
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.models.Shop || mongoose.model('Shop', shopSchema);
export default Shop;