import mongoose from 'mongoose';

const history = new mongoose.Schema(
    {
      isViewed : { type: Boolean, required: true, default: false },
      isProduct : { type: Boolean, required: true, default: false },
      message : { type: String, required: true},
      product : { type: Array },
      orderLink : { type: String },
    },
    {
      timestamps: true,
    }
);

const userdataSchema = new mongoose.Schema(
  {
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