import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Rcustomer from '../../../../../models/Rcustomer';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const rcustomer = await Rcustomer.findById(req.query.id);
  await db.disconnect();
  res.send(rcustomer);
});

handler.put(async (req, res) => {
  await db.connect();
  const rcustomer = await Rcustomer.findById(req.query.id);
  if (rcustomer) {
    rcustomer.image = req.body.image;
    rcustomer.slug = req.body.slug;
    rcustomer.instaLink = req.body.instaLink;
    await rcustomer.save();
    await db.disconnect();
    res.send({ message: 'Rcustomer Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Rcustomer Not Found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const rcustomer = await Rcustomer.findById(req.query.id);
  if (rcustomer) {
    await rcustomer.remove();
    await db.disconnect();
    res.send({ message: 'Rcustomer Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Rcustomer Not Found' });
  }
});

export default handler;
