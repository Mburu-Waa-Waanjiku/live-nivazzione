import nc from 'next-connect';
import Bag from '../../../models/Bag';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const bag = await Bag.find({user: req.user._id});
  
  if(bag.length > 0) {

  const price = bag[0].itemsPrice;
  const ID = bag[0]._id;
  const priceN = 0 + req.body.itemsPrice;
  const newPrice = price + priceN;
  
  await Bag.updateOne(
        { _id: ID },
        {
          $push: {
            orderItems: { $each: req.body.orderItems }
          }
        }
      );
    console.log('updated'); 
    const upadedItemPrice = await Bag.findById(ID);
    upadedItemPrice.itemsPrice = newPrice;
    await upadedItemPrice.save();
    await db.disconnect();
    res.status(201).send(bag);
  } else {
      const newBag = new Bag({
        ...req.body,
        user: req.user._id,
      });
      const bag = await newBag.save();
      await db.disconnect();
      res.status(201).send(bag);
  }

});

export default handler;
