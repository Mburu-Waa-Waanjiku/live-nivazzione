import nc from 'next-connect';
import { isAuth, isSeller } from '../../../../utils/auth';
import Shopproducts from '../../../../models/Shopproducts';
import db from '../../../../utils/db';
import Order from '../../../../models/Order';

const handler = nc();
handler.use(isAuth, isSeller);

handler.get(async (req, res) => {
  await db.connect();
  const shopPs = await Order.find({ isDelivered: false });
  let ordersItms;
  for (const x of shopPs) {
    ordersItms = [...x.orderItems]
  }
  //console.log(ordersItms);
  const shopOrders = ordersItms.filter((o) => o.shopId == req.user.shopId)
  await db.disconnect();
  res.send(shopOrders);
});

export default handler;