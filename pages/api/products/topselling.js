import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  const topselling = [...products.filter((product) => product.initialStock - product.countInStock > 5 ).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1)];  

  res.send(topselling);
});

export default handler;
