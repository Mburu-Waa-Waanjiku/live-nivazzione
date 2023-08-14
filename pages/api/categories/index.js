import nc from 'next-connect';
import Banner from '../../../models/Banner';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.get(async (req, res) => {
  await db.connect();
  //tis api is no in use
  //const banner = await Banner.find({ largeText1: "category"}).lean();
  res.status(201).send(banner);
});

export default handler;
