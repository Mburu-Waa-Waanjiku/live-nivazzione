import nc from 'next-connect';
import { isAuth, isAdmin } from '../../../../../utils/auth';
import Shopproducts from '../../../../../models/Shopproducts';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.put(async (req, res) => {
  await db.connect();

    await Shopproducts.updateOne( 
        {_id: req.query.id},
        {
            $push: {
              message : req.body.message,
            },
        }
    )
    const chats = await Shopproducts.findById(req.query.id);
  await db.disconnect();
  res.send(chats);
});


export default handler;