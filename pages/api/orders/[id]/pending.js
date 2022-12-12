import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import onError from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';
 
const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPending = true;
    const pendingOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'order pending', order: pendingOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'order not found' });
  }
});

export default handler;
