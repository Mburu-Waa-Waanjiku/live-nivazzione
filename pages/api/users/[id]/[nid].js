import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../../models/User';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';
import { signToken } from '../../../../utils/auth';

const handler = nc();


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


export default handler;
