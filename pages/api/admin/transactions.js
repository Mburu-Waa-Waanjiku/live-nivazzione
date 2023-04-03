import nc from 'next-connect';
import Transaction from '../../../models/Transaction';
import { isAuth, isAdmin } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const bags = await Transaction.find({}).sort({ createdAt: -1 });
  await db.disconnect();
  res.send(bags);
});

export default handler;