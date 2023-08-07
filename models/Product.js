import mongoose from 'mongoose';
import Shop from './Shop';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const favsData = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
  }
);

const colors = new mongoose.Schema(
  {
    slug: { type: String },
    color: { type: Array, required: true },
  },
  {
    timestamps: false,
  }
);

const sizeData = new mongoose.Schema(
  {
    psize: { type: String },
    price: { type: Number },
    bust: { type: Number },
    shoulder: { type: Number },
    sleave: { type: Number },
    length: { type: Number },
    cuff: { type: Number },
    bicep: { type: Number },
    thigh: { type: Number },
    inseam: { type: Number },
    count: { type: Number },
  },
  {
    timestamps: false,
  }
);
 
const productSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: Array, required: true },
    gallery:{ type: Array},
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    isEditorsChoice: { type: Boolean, required: true, default: false },
    gender: { type: String, required: true },
    distinctCateg: { type: Array, required: true }, 
    subcategs: { type: Array, required: true },
    isOnoffer: { type: Boolean, required: true, default: false },
    color: [colors],
    sizes: [sizeData],
    isCollectn: { type: Boolean, default: false },
    collectionType: { type: Array },    
    favourites: [favsData],
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: Shop, required: true },
    carts: { type: Number, required: true, default: 0 },
    views: { type: Number, required: true, default: 0},
    pageViews: { type: Number, required: true, default: 0},
    ordered: { type: Number, required: true, default: 0},
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
