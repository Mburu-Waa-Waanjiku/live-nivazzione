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
    {},
    {
      $set: {
        shopId : "64db4836469adb04c9ad6a7d",
      }
    },
  );
  await db.disconnect();
  console.log('done');
  res.status(201);
});

export default handler;
