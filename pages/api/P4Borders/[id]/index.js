import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Bag from '../../../../models/Bag';
import db from '../../../../utils/db';
 
const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const bag = await Bag.findById(req.query.id);
  await db.disconnect();
  res.send(bag);
});

handler.delete(async (req, res) => {
  await db.connect();
  const bag = await Bag.findById(req.query.id);
  if (bag) {
    await bag.remove();
    await db.disconnect();
    res.send({ message: 'Bag Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Bag Not Found' });
  }
});

handler.put(async (req, res) => {
  await db.connect();
  const bag = await Bag.findById(req.query.id);
  
  if(bag) {
  console.log('old bag');
  await Bag.updateOne(
        { _id: req.query.id },
        {
          $set: {
            isChecked: true 
          }
        }
      );
    console.log('updated'); 
    res.status(200).send('updated');
  } 
});

export default handler;
