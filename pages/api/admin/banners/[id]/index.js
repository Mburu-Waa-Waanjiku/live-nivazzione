import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Banner from '../../../../../models/Banner';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const banner = await Banner.findById(req.query.id);
  await db.disconnect();
  res.send(banner);
});

handler.put(async (req, res) => {
  await db.connect();
  const banner = await Banner.findById(req.query.id);
  if (banner) {
    banner.smallText = req.body.smallText;
    banner.midText = req.body.midText;
    banner.largeText1 = req.body.largeText1;
    banner.image = req.body.image;
    banner.buttonText = req.body.buttonText;
    banner.discount = req.body.discount;
    banner.desc = req.body.desc;
    await banner.save();
    await db.disconnect();
    res.send({ message: 'Banner Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Banner Not Found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const banner = await Banner.findById(req.query.id);
  if (banner) {
    await banner.remove();
    await db.disconnect();
    res.send({ message: 'Banner Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Banner Not Found' });
  }
});

export default handler;
