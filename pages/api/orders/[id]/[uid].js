import nc from 'next-connect';
import Order from '../../../../models/Order';
import Shop from '../../../../models/Shop';
import User from '../../../../models/User'
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
  for( const x of order.orderItems ) {
    await Shop.updateOne(
      {_id: x.shopId},
      {
        $push: {
          orderedItems: x
        }
      }
    )
  }
  const userid = order.user;
  const user = await User.findById(userid);
  if (user) {
    const message = {
        isViewed: false,
        isProduct: false,
        message: 'Your Order Has been Dispatched to Your Pick up Station. You can Pick your Order as soon as Tomorrow if your Pick up Station is in Nairobi CBD. For the rest of the pick up stations, your Order will be ready for collection after not more than 24 hours 😊',
        orderLink: `https://www.shiglam.com/order/${req.query.id}`,
      };
      user.notifications.push(message);
    await user.save();
    await db.disconnect();
    res.status(200).send({ message: 'message sent' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'message not sent' });
  }
});

export default handler;
