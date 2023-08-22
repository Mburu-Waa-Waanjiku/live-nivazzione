import nc from 'next-connect';
import Shop from '../../../../models/Shop';
import { isAuth, isSeller } from '../../../../utils/auth';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error';
import User from '../../../../models/User';
import { signToken } from '../../../../utils/auth';

const handler = nc({
  onError,
});
handler.use(isAuth, isSeller);

handler.post(async (req, res) => {
    console.log('starting');
    await db.connect();
      const newShop = new Shop({
        ...req.body,
        user: req.query.id,
        slug: Math.random().toString(),
      });
      console.log(newShop);
      console.log('creating');
      const shop = await newShop.save();
      console.log('shop is');
      console.log(shop);
      await User.updateOne(
        { _id: req.query.id},
        {
          $set: {
            'shopId.0': shop._id.toString(),
          },
        }
      );
      const user = await User.findOne({ _id: req.query.id });
      console.log('found user');
    await db.disconnect();
    if (user) {
      const token = signToken(user);
      const info = {
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isAffiliate: user.isAffiliate,
        isSeller: user.isSeller,
        shopId: user.shopId
      };
      res.send(info);
      console.log('we are done');
    } else {
      res.status(401).send({ message: 'Invalid user' });
    }
  });

export default handler;
