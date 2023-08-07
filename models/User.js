import mongoose from 'mongoose';
import Product from './Product';
import Shop from './Shop';

const notificationsSchema = new mongoose.Schema(
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

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },    
    password: { type: String, required: true },
    shopsFollowed: { type: Array },
    isAdmin: { type: Boolean, required: true, default: false },
    isAffiliate: { type: Boolean, required: true, default: false },
    isSeller: { type: Boolean, required: true, default: false },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: Shop },
    favourites: { type: Array },
    shiglamPoints: { type: Number, required: true, default: 0},
    totalBuys: { type: Number, required: true, default: 0 },
    accountType: { type: String, required: true, default: "Bronze" },
    notifications : [notificationsSchema]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;