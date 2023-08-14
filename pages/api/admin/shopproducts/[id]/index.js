import nc from 'next-connect';
import { isAuth, isSeller } from '../../../../../utils/auth';
import Shopproducts from '../../../../../models/Shopproducts';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isSeller);

handler.get(async (req, res) => {
  await db.connect();
  const shopPs = await Shopproducts.find({}).sort({ createdAt: -1 });
  await db.disconnect();
  res.send(shopPs);
});

handler.put(async (req, res) => {
    
  await db.connect();
    const product = await Shopproducts.findById(req.query.id);
    if(product) {
        product.name = req.body.name;
        product.category = req.body.category;
        product.image = req.body.image;
        product.gallery = req.body.gallery;
        product.brand = req.body.brand;
        product.description = req.body.description;
        product.gender = req.body.gender;
        product.subcategs = req.body.subcategs;
        product.color = req.body.color;
        product.sizes = req.body.sizes;
        await product.save();
        res.send({ message: 'Shop product Updated' });
    }
  await db.disconnect();
  
});

export default handler;