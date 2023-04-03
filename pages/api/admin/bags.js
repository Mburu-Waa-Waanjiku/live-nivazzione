import nc from 'next-connect';
import Bag from '../../../models/Bag';
import { isAuth, isAdmin } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const bags = await Bag.find({}).populate('user', 'name').sort({ updatedAt: -1 });
  await db.disconnect();
  console.log(bags);
  res.send(bags);
});

export default handler;
