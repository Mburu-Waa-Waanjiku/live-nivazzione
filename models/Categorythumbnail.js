import mongoose from 'mongoose';

const categorythumbnailSchema = new mongoose.Schema(
  { 
    name: { type: Array, required: true },
    image: { type: Array, required: true },
   }, 
  { 
    timestamps: true,
  }
);

const Categorythumbnail =
  mongoose.models.Categorythumbnail || mongoose.model('Categorythumbnail', categorythumbnailSchema);
export default Categorythumbnail;