import mongoose from 'mongoose';
import User from './User';
import Shop from './Shop';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: Array, required: true },
        collected: {type: Boolean, required: true, default: false},
        csize: { type: Object, required: true },
        shopId: { type: mongoose.Schema.Types.ObjectId, ref: Shop, required: true }      
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      county: { type: String, required: true },
      dropstation: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true },
    bundlePrice: { type: Number },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    oldTotalPrice: {type: Number},
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
    wasBag: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;