import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    isAffiliate: false,
    isSeller: false,
  });
  const user = await newUser.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    isAdmin: user.isAdmin,
    isAffiliate: user.isAffiliate,
    isSeller: user.isSeller    
  });
});

export default handler;