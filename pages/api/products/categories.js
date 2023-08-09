import nc from 'next-connect';
import Banner from '../../../models/Banner';
import Product from '../../../models/Product';
import db from '../../../utils/db';
import Shop from '../../../models/Shop';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const categories = await Banner.find({ largeText1: "category"}).lean();
  await db.disconnect();
  res.send(categories);
});
handler.post(async (req, res) => {
  await db.connect();
  const products = await Product.find({}, { name: 1, shopId: 1, slug: 1, category: 1, image: 1, description: 1, brand: 1 }).lean();
  await db.disconnect();
  res.send(products);
});
handler.put(async (req, res) => {
  await db.connect();
  const products = await Product.find({}, {name:1, slug:1, category:1, image:1, gallery:1, isEditorsChoice: 1, isOnoffer: 1, shopId: 1 }).lean().limit(24);
  const shop = await Shop.find({}, { shopName: 1, logo: 1, coverPhoto: 1, ratings: 1 }).lean();
  await db.disconnect();
  res.send({products, shop});
});

export default handler;
