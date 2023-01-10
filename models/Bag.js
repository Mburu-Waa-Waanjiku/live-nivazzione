import mongoose from 'mongoose';
 
const bagSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: Array, required: true },
        price: { type: Number, required: true },
      },
    ],
    itemsPrice: { type: Number, required: true },    
  },
  {
    timestamps: true,
  }
);

const Bag = mongoose.models.Bag || mongoose.model('Bag', bagSchema);
export default Bag;