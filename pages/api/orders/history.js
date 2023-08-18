import nc from 'next-connect';
import Order from '../../../models/Order';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

//Collecting user orders
handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.send(orders);
});

//Confirm order Delivery
handler.post(async (req, res) => {
  await db.connect();
    await Order.updateOne(
      {_id: req.body._id},
      {
        $set: {
          isCollected: true
        }
      }
    )
  await db.disconnect();
  res.send('Order is now Collected');
});

export default handler;
