import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Categorythumbnail from '../../../../models/Categorythumbnail';
import db from '../../../../utils/db';
  
const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const categorythumbnails = await Categorythumbnail.find({});
  await db.disconnect();
  res.send(categorythumbnails);
});

handler.post(async (req, res) => {
  await db.connect();
  const newCategorythumbnail = new Categorythumbnail({
    name: 'sample name',
    image: '/images/shirt1.jpg',
  });

  const categorythumbnail = await newCategorythumbnail.save();
  await db.disconnect();
  res.send({ message: 'Categorythumbnail Created', categorythumbnail });
});

export default handler;
