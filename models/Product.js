import mongoose from 'mongoose';

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
 
const productSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: Array, required: true },
    gallery:{ type: Array},
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    isEditorsChoice: { type: Boolean, required: true, default: false },
    gender: { type: String, required: true },
    distinctCateg: { type: Array, required: true }, 
    isOnoffer: { type: Boolean, required: true, default: false },
    prevprice: { type: Number},
    discount: { type: Number},
    isCollectn: { type: Boolean, default: false },
    initialStock: { type: Number, required: true },
    collectionType: { type: String },    
    isNeww: { type: Boolean, required: true, default: false },
    featuredImage: { type: Array },
    isFeatured: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
