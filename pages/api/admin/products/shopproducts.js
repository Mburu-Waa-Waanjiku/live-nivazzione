import nc from 'next-connect';
import { isAuth, isAdmin } from '../../../../utils/auth';
import Shopproducts from '../../../../models/Shopproducts';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const shopPs = await Shopproducts.find({updatedIsProduct : false}).sort({ createdAt: -1 });
  await db.disconnect();
  res.send(shopPs);
});

export default handler;