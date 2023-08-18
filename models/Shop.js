import mongoose from 'mongoose';

const FollowersDate = new mongoose.Schema(
  { 
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

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

const shopOrders = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: Array, required: true },
    collected: {type: Boolean, required: true, default: false},
    csize: { type: Object, required: true },
    productId: { type: String },
    confirmed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
 
const shopSchema = new mongoose.Schema(
  { 
    shopName: { type: String, required: true },
    slug: {type: String, unique: false },
    logo: { type: String, required: true },
    coverPhoto: { type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    orderedItems: [shopOrders],
    follows: [FollowersDate],
    ratings: { type: Number, required: true, default: 4.5 },
    message: [Shopmessages],
    sales: { type: Number, required: true, default: 241}
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.models.Shop || mongoose.model('Shop', shopSchema);
export default Shop;