import nc from 'next-connect';
import Bag from '../../../models/Bag';
import { isAuth } from '../../../utils/auth';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.delete(async (req, res) => {
  await db.connect();
  const bag = await Bag.findById(req.body.ID);
  if (bag) {
    await bag.remove();
    await db.disconnect();
    res.send({ message: 'Bag Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Bag Not Found' });
  }
});


export default handler;
