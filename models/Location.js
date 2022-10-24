import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    town: { type: String, required: true },
    dropstation: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Location = mongoose.models.Location || mongoose.model('Location', locationSchema);
export default Location;