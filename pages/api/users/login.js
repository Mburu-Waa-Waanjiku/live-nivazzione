import User from '../../../models/User';
import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  console.log('start');
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  console.log('user found');
  await db.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    console.log('user found');
    const token = signToken(user);
    const info = {
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isAffiliate: user.isAffiliate,
      isSeller: user.isSeller,
      shopId: user.shopId
    };
    res.send(info);
    console.log('userinfo ready');
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
    console.log('userinfo code red');
  }
});

export default handler;
