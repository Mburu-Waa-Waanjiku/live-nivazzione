import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  await db.connect();
  //tis api is no in use
  console.log('starting');
  await Product.updateMany(
    {category: "Sneakers"},
    {
      $set: {
        shopId : "64db3611b595447c18560071",
      }
    },
  );
  await db.disconnect();
  console.log('done');
  res.status(201);
});

export default handler;
