import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Location from '../../../../../models/Location';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const location = await Location.findById(req.query.id);
  await db.disconnect();
  res.send(location);
});

handler.put(async (req, res) => {
  await db.connect();
  const location = await Location.findById(req.query.id);
  if (location) {
    location.town = req.body.town;
    location.price = req.body.price;
    location.dropstation = req.body.dropstation;
    await location.save();
    await db.disconnect();
    res.send({ message: 'Location Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Location Not Found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const location = await Location.findById(req.query.id);
  if (location) {
    await location.remove();
    await db.disconnect();
    res.send({ message: 'Location Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Location Not Found' });
  }
});

export default handler;
