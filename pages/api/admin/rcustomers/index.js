import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Rcustomer from '../../../../models/Rcustomer';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const rcustomers = await Rcustomer.find({});
  await db.disconnect();
  res.send(rcustomers);
});

handler.post(async (req, res) => {
  await db.connect();
  const newRcustomer = new Rcustomer({
    image: 'image',
    slug: 'product slug',
    instaLink: 'Instagrom Link',
  });
 
  const rcustomer = await newRcustomer.save();
  await db.disconnect();
  res.send({ message: 'Rcustomer Created', rcustomer });
});

export default handler;
