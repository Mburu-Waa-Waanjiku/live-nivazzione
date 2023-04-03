import mongoose from 'mongoose';
import Product from './Product';
 
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
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    favourites: { type: Array },
    notifications : [notificationsSchema]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;