import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Product from '../../../../../models/Product';
import db from '../../../../../utils/db';
 
const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.image[0] = req.body.image0;
    product.image[1] = req.body.image1;
    product.image[2] = req.body.image2;
    product.gallery = req.body.gallery;
    product.price = req.body.price;
    product.brand = req.body.brand;
    product.countInStock = req.body.countInStock;
    product.gender = req.body.gender;
    product.isEditorsChoice = req.body.isEditorsChoice;
    product.distinctCateg[0] = req.body.distinctCateg1;
    product.distinctCateg[1] = req.body.distinctCateg2;
    product.distinctCateg[2] = req.body.distinctCateg3;
    product.distinctCateg[3] = req.body.distinctCateg4;
    product.distinctCateg[4] = req.body.distinctCateg5;
    product.distinctCateg[5] = req.body.distinctCateg6;
    product.isOnoffer = req.body.isOnoffer;
    product.prevprice = req.body.prevprice;
    product.discount = req.body.discount; 
    product.isCollectn = req.body.isCollectn;
    product.initialStock = req.body.initialStock;
    product.collectionType = req.body.collectionType;   
    product.isNeww = req.body.isNeww;
    product.isBurgain = req.body.isBurgain;
    product.description = req.body.description;    
    product.featuredImage = req.body.featuredImage;
    product.isFeatured = req.body.isFeatured;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Product Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product Not Found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: 'Product Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default handler;
