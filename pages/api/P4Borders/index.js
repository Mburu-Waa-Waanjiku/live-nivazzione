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
  console.log('old bag');
  const price = bag[0].itemsPrice;
  const ID = bag[0]._id;
  const priceN = 0 + req.body.itemsPrice;
  const newPrice = price + priceN;
  
  await Bag.updateOne(
        { _id: ID },
        {
          $push: {
            orderItems: req.body.orderItems 
          }
        }
      );
  await Bag.updateOne(
        { _id: ID },
        {
          $set: {
            updated: req.body.orderItems 
          }
        }
      );
    console.log('updated'); 

    const upadedItemPrice = await Bag.findById(ID);
    upadedItemPrice.isNewbag = false;
    upadedItemPrice.isChecked = false;
    upadedItemPrice.itemsPrice = newPrice;
    await upadedItemPrice.save();
    await db.disconnect();
    res.status(200).send(bag);
  } else {
      console.log('new bag');
      const newBag = new Bag({
        ...req.body,
        isChecked: false,
        isNewbag: true,
        user: req.user._id,
      });
      const bag = await newBag.save();
      await db.disconnect();
      res.status(200).send(bag);
  }

});

handler.put(async (req, res) => {
  await db.connect();
  const bag = await Bag.find({user: req.user._id});
  
  if(bag.length > 0) {
  console.log('old bag');
  const price = bag[0].itemsPrice;
  const ID = bag[0]._id;
  const priceN = 0 + req.body.itemsPrice;
  const newPrice = price + priceN;
  
  await Bag.updateOne(
        { _id: ID },
        {
          $set: {
            isChecked: true 
          }
        }
      );
    console.log('updated'); 
    res.status(200).send('updated');
  } 
});
 
export default handler;
