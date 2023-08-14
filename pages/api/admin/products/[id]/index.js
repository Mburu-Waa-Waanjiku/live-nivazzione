import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Product from '../../../../../models/Product';
import Shopproducts from '../../../../../models/Shopproducts';
import User from '../../../../../models/User';
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
  if (product ) {
    product.subcategs =  req.body.subcategs,
    product.color = req.body.color,
    product.sizes = req.body.sizes,
    product.image = req.body.image;
    product.name = req.body.name;
    product.category = req.body.category;
    product.gallery = req.body.gallery;
    product.brand = req.body.brand;
    product.gender = req.body.gender;
    product.isEditorsChoice = req.body.isEditorsChoice;
    product.distinctCateg = req.body.distinctCateg;
    product.isOnoffer = req.body.isOnoffer;
    product.isCollectn = req.body.isCollectn;
    product.collectionType = req.body.collectionType;   
    product.isNeww = req.body.isNeww;
    product.description = req.body.description;    
    
    const newProduct = await product.save();

    const message = { 
        isViewed: false,
        isProduct: true,
        message: 'Hellow lovely 😊, Guess what!! , you liked this product ✨ and its now in stock 🥳. Hurry up before it is out of stock again 😊',
        product: newProduct,
      };
    await User.updateMany(
        { favourites: req.query.id },
        {
          $push: {
            notifications : message,
          },
        }
      );
  } 
  await db.disconnect();
  res.send({ message: 'Product Updated Successfully' });
});

handler.post(async (req, res) => {
  await db.connect();
  const shopproduct = await Shopproducts.findById(req.query.id);
  const newProduct = new Product({
    ...req.body,
    shopId: shopproduct.shopId,
    slug: shopproduct.slug
  }); 
  const product = await newProduct.save();
  await Shopproducts.updateOne(
    { _id: req.query.id },
    {
      $set: {
        "updatedIsProduct" : true,
      },
    }
  );

  await db.disconnect();
  res.send({ message: 'Product Created', product });
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
