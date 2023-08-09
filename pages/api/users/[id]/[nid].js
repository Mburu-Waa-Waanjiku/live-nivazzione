import nc from 'next-connect';
import User from '../../../../models/User';
import Shop from '../../../../models/Shop';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
    await db.connect();
      const id = req.query["id"];
      await User.updateOne(
        { _id: req.query.id, 'notifications._id': req.query.nid },
        {
          $set: {
            'notifications.$.isViewed': true,
          },
        }
      );
      const updatedUser = await User.findOne({ _id: id });
      const newNotes = updatedUser.notifications;
    await db.disconnect();
    res.status(200).send(newNotes);
  } 

);

handler.put(async (req, res) => {
  await db.connect();
    await Shop.updateOne(
      { _id: req.query.id },
      {
        $push: {
          'follows': req.body,
        },
      }
    );
    await User.updateOne(
      { _id: req.query.nid },
      {
        $push: {
          'shopsFollowed': req.query.nid.toString(),
        },
      }
    );
  await db.disconnect();
  res.status(200).send('successful');
} 

);


export default handler;
