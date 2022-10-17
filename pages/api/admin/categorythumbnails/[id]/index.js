import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Categorythumbnail from '../../../../../models/Categorythumbnail';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const categorythumbnail = await Categorythumbnail.findById(req.query.id);
  await db.disconnect();
  res.send(categorythumbnail);
});

handler.put(async (req, res) => {
  await db.connect();
  const categorythumbnail = await Categorythumbnail.findById(req.query.id);
  if (categorythumbnail) {
    categorythumbnail.name = req.body.name;
    categorythumbnail.image = req.body.image;
    await categorythumbnail.save();
    await db.disconnect();
    res.send({ message: 'Categorythumbnail Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Categorythumbnail Not Found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const categorythumbnail = await Categorythumbnail.findById(req.query.id);
  if (categorythumbnail) {
    await categorythumbnail.remove();
    await db.disconnect();
    res.send({ message: 'Categorythumbnail Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Categorythumbnail Not Found' });
  }
});

export default handler;
