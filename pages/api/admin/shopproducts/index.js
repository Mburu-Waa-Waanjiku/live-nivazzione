import nc from 'next-connect';
import { isAuth, isSeller } from '../../../../utils/auth';
import Shopproducts from '../../../../models/Shopproducts';
import db from '../../../../utils/db';
import Product from '../../../../models/Product';

const handler = nc();
handler.use(isAuth, isSeller);

handler.get(async (req, res) => {
  await db.connect();
  const shopPs = await Shopproducts.find({shopId: req.user.shopId, updatedIsProduct: false}).sort({ updatedAt: -1 });
  await db.disconnect();
  res.send(shopPs);
});

handler.post(async (req, res) => {
  await db.connect();
  const shopPs = await Product.find({shopId: req.user.shopId}).sort({ createdAt: -1 });
  await db.disconnect();
  res.send(shopPs);
});

handler.put(async (req, res) => {
  
  const myslug = req.body.name.replace(/ /g, "-") + Math.random();
  
  await db.connect();
    const newShopproduct = new Shopproducts({
      ...req.body,
      slug: myslug,
      shopId: req.user.shopId,
    }); 
    const shopP = await newShopproduct.save();
  await db.disconnect();
  res.send({ message: 'Product Created', shopP });
  
});

export default handler;