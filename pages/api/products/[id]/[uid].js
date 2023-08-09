import nc from 'next-connect';
import Product from '../../../../models/Product';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();

    await User.updateOne(
        { _id: req.query.uid },
        {
          $push: {
            favourites: (req.query.id).toString()
          }
        }
      );
    await Product.updateOne(
        { _id: req.query.id },
        {
          $push: {
            favourites: (req.query.id).toString()
          }
        }
      );
    await db.disconnect();
    res.status(200).send("successful");
  } 

);

handler.delete(async (req, res) => {
  await db.connect();
    
    await User.updateOne(
        { _id: req.query.uid },
        {
          $pull: {
            favourites: (req.query.id).toString()
          }
        }
      );
    await Product.updateOne(
        { _id: req.query.id },
        {
          $pull: {
            favourites: (req.query.id).toString()
          }
        }
      );
    console.log('updated'); 
    await db.disconnect();
    res.status(200).send("successful");
  } 

);

export default handler;