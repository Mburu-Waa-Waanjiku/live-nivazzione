import nc from 'next-connect';
import Bag from '../../../models/Bag';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const bags = await Bag.find({ user: req.user._id });
  res.send(bags);
});

export default handler;
