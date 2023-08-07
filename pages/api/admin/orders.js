import nc from 'next-connect';
import Order from '../../../models/Order';
import Shop from '../../../models/Shop';
import { isAuth, isAdmin } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
    const orders = await Order.find({}).populate('user', 'name').sort({ createdAt: -1 });
    const shopPs = await Order.find({ isDelivered: false });
    let ordersItms;
    for (const x of shopPs) {
      ordersItms = [...x.orderItems]
    }
    const Shops = await Order.find({ isDelivered: false }).distinct("orderItems.shopId");
    const distinctShop = await Shop.find({_id: Shops}).lean();
    await db.disconnect();
  res.send({orders, ordersItms, distinctShop});
});

export default handler;
