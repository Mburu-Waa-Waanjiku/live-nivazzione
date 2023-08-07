import mongoose from 'mongoose';

const colors = new mongoose.Schema(
  {
    slug: { type: String },
    color: { type: Array, required: true },
  },
  {
    timestamps: false,
  }
);

const Shopmessages = new mongoose.Schema(
  { 
    message : { type: String, required: true},
  },
  {
    timestamps: true,
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
 
const shopproductsSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: Array, required: true },
    gallery:{ type: Array},
    updatedIsProduct: {type: Boolean, required: true, default: false},
    brand: { type: String, required: true },
    description: { type: String, required: true },
    gender: { type: String, required: true },
    subcategs: { type: Array, required: true },
    color: [colors],
    sizes: [sizeData],
    shopId: { type: mongoose.Schema.Types.ObjectId },
    message: [Shopmessages],
  },
  {
    timestamps: true,
  }
);

const Shopproducts =
  mongoose.models.Shopproducts || mongoose.model('Shopproducts', shopproductsSchema);
export default Shopproducts;
