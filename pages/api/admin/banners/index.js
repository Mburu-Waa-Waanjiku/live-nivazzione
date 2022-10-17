import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Banner from '../../../../models/Banner';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const banners = await Banner.find({});
  await db.disconnect();
  res.send(banners);
});

handler.post(async (req, res) => {
  await db.connect();
  const newBanner = new Banner({
    smallText: 'sample smalltext',
    midText: 'sample midtext',
    largeText1: 'sample largetext',
    image: '/images/shirt1.jpg',
    buttonText: 'button text',
    discount: 'sample discount ',
    desc: 'sample description',
  });

  const banner = await newBanner.save();
  await db.disconnect();
  res.send({ message: 'Banner Created', banner });
});

export default handler;
