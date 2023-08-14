import nc from 'next-connect';
import Bag from '../../../models/Bag';
import User from '../../../models/User';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.user._id);
  const bag = await Bag.find({user: req.user._id});
  
  if(bag.length > 0) {
  console.log('old bag');
  const points = req.body.itemsPrice / 25 ;
  const totalPoints = points + user.shiglamPoints ; 
  const price = bag[0].itemsPrice;
  const ID = bag[0]._id;
  const priceN = 0 + req.body.itemsPrice;
  const newPrice = price + priceN;
  const buys = user.totalBuys + req.body.itemsPrice ;

  await User.updateOne(
      { _id: req.user._id },
        {
          $set: {
            shiglamPoints : totalPoints,
            totalBuys : buys,
        },
      }
    );
  
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
      const points = req.body.itemsPrice / 25 ;
      const totalPoints = points + user.shiglamPoints ; 
      const buys = user.totalBuys + req.body.itemsPrice ;

      await User.updateOne(
          { _id: req.user._id },
            {
              $set: {
                shiglamPoints : totalPoints,
                totalBuys : buys,
            },
          }
        );

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

 
export default handler;
