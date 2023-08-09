import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({}).sort({ createdAt: -1 });
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  const imageItem = 
  await db.connect();
  const newProduct = new Product({
    name: 'sample name',
    slug: 'sample-slug-' + Math.random(),
    image:  [
      {
        item: '/images/il_1140xN.3076823954_n08q.jpg',
      },
    ],
    price: 0,
    isCollectn: true,
    category: 'Earrings',
    brand: 'SHIGLAM FASHON',
    distinctCateg: ['1', '2', '3', '4', '5', '6'],
    countInStock: 0,
    initialStock: 1,
    description: 'sample description',
    gender: 'sample gender',
    rating: 4.5,
    numReviews: 0,
  }); 

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: 'Product Created', product });
});

export default handler;