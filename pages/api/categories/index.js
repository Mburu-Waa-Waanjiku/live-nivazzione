import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  /*await db.connect();
  //tis api is no in use
  await Product.updateMany(
    {},
    {
      $set: {
        "shopId" : "64db4836469adb04c9ad6a7d",
      }
    },
  );
  res.status(201).send(banner);*/
});

export default handler;
