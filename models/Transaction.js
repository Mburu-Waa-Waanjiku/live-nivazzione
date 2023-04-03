import mongoose from 'mongoose';
 
const transactionSchema = new mongoose.Schema(
  {
    Phone: { type: Number, required: true },
    Code: { type: String, required: true },
    Amount: { type: Number, required: true },
    isNewtransac: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
export default Transaction;