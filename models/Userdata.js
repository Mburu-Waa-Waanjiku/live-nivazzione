import mongoose from 'mongoose';

const history = new mongoose.Schema(
  {
    productId : { type: Boolean, required: true, default: false },
    view : { type: Boolean, required: true, default: false },
    pageView : { type: String, required: true},
    wardrobed: {type: Number},
    carted : { type: Array },
    ordered : { type: String },
  },
  {
    timestamps: true,
  }
);

const userdataSchema = new mongoose.Schema(
  {
    dataId: {type: String, required: true },
    products: {history},
    userId: { type: String, required: true, unique: true },
    phoneInfo: { type: Number, required: true },    
    locaton: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const Userdata = mongoose.models.Userdata || mongoose.model('Userdata', userdataSchema);
export default Userdata;