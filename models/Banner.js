import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  { 
  	smallText:{ type: Array, required: true },
    midText:{ type: String, required: true },
    largeText1:{ type: String, required: true },
    image:{ type: Array, required: true },
    buttonText:{ type: String, required: true },
    discount:{ type: Array, required: true },
    desc:{ type: String, required: true },
    
   }, 
  { 
    timestamps: true,
  }
);
const Banner =
  mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
export default Banner;
			