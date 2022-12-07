import mongoose from 'mongoose';

const rcustomerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    slug: { type: String, required: true },
    instaLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Rcustomer = mongoose.models.Rcustomer || mongoose.model('Rcustomer', rcustomerSchema);
export default Rcustomer;