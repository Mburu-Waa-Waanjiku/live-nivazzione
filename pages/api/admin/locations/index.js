import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Location from '../../../../models/Location';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const location = await Location.find({});
  await db.disconnect();
  res.send(location);
});

handler.post(async (req, res) => {
  await db.connect();
  const newLocation = new Location({
    town: 'Town',
    price: 0,
    dropstation: 'Drop station',
  });
 
  const location = await newLocation.save();
  await db.disconnect();
  res.send({ message: 'Location Created', location });
});

export default handler;
