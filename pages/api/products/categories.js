import nc from 'next-connect';
import Banner from '../../../models/Banner';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const categories = await Banner.find({ largeText1: "category"}).lean();
  await db.disconnect();
  res.send(categories);
});
handler.post(async (req, res) => {
  await db.connect();
  const products = await Product.find({}, { name: 1, slug: 1, category: 1, image: 1, description: 1, brand: 1 }).lean();
  await db.disconnect();
  res.send(products);
});

export default handler;
