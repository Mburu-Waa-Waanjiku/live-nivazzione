import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';
import { signToken } from '../../../../utils/auth';

const handler = nc();

handler.get(async (req, res) => {
    await db.connect();
      const favouriteids = await User.find(
       { _id: req.query.id },
      )
      .distinct('favourites');
      const favProds = await Product.find(
      {_id: favouriteids} ,
      '-reviews')
      .lean();
    await db.disconnect();
    res.status(200).send(favProds);
  } 

);

handler.post(async (req, res) => {
    await db.connect();
      const id = req.query["id"];
      const user = await User.findOne({ _id: id });
      const notes = user.notifications;
    await db.disconnect();
    res.status(200).send(notes);
  } 

);

handler.put(async (req, res) => {
  const id = req.query["id"];
  await db.connect();
  const user = await User.findOne({ _id: id });
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
  await db.disconnect();
  const token = signToken(user);
  res.status(200).send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});


export default handler;
