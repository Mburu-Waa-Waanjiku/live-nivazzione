import nc from 'next-connect';
import Order from '../../../models/Order';
import User from '../../../models/User';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.put(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});

handler.post(async (req, res) => {
  let total;
  if ( req.body.bundlePrice ) {
     total = req.body.bundlePrice
  } else {
    total = req.body.itemsPrice
  }

  const points = total / 25;
  console.log(points);
  await db.connect();
    const user = await User.findById(req.user._id);
    const buys = user.totalBuys + total ;
    const totalPoints = points + user.shiglamPoints ; 
    console.log('starting');
    await User.updateOne(
      { _id: req.user._id },
        {
          $set: {
            shiglamPoints : totalPoints,
            totalBuys : buys,
        },
      }
    );
   console.log('done'); 

  const newOrder = new Order({
    ...req.body,
    user: req.user._id,
  });
  const order = await newOrder.save();
   
  res.status(201).send(order);
});

export default handler;
