import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  const orderItems = req.body.orderItems;
  console.log(orderItems);

  const orderIds = orderItems.map(s=>s._id);
  console.log(orderIds);

  await db.connect();
  const products = await Product.find({_id: orderIds });
  await db.disconnect();
  console.log(products);
  
  const quantityMap = orderItems.reduce(
    (quantities, { _id, quantity }) => ({
      ...quantities,
      [_id]: quantity || 0
    }),
    {}
  );
  console.log(quantityMap);

  const newProductStocks = products.map((product) => ({
    _id: product._id,
    countInStock: product.countInStock - (quantityMap[product._id] || 0)
  }));
  console.log(newProductStocks.length);

  await db.connect();
    if(newProductStocks.length == 1) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 2) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 3) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      const updatedProds3 = await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 4) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      const updatedProds3 = await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      const updatedProds4 = await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 5) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      const updatedProds3 = await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      const updatedProds4 = await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      const updatedProds5 = await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 6) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      const updatedProds3 = await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      const updatedProds4 = await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      const updatedProds5 = await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      const updatedProds6 = await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 7) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      const updatedProds3 = await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      const updatedProds4 = await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      const updatedProds5 = await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      const updatedProds6 = await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
      const updatedProds7 = await Product.updateOne(
        {
          _id: newProductStocks[6]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[6].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 8) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      const updatedProds3 = await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      const updatedProds4 = await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      const updatedProds5 = await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      const updatedProds6 = await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
      const updatedProds7 = await Product.updateOne(
        {
          _id: newProductStocks[6]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[6].countInStock,
          },
        }
      );
      const updatedProds8 = await Product.updateOne(
        {
          _id: newProductStocks[7]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[7].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 9) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      const updatedProds3 = await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      const updatedProds4 = await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      const updatedProds5 = await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      const updatedProds6 = await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
      const updatedProds7 = await Product.updateOne(
        {
          _id: newProductStocks[6]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[6].countInStock,
          },
        }
      );
      const updatedProds8 = await Product.updateOne(
        {
          _id: newProductStocks[7]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[7].countInStock,
          },
        }
      );
      const updatedProds9 = await Product.updateOne(
        {
          _id: newProductStocks[8]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[8].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else if(newProductStocks.length == 10) {

      const updatedProds1 = await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      const updatedProds2 = await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      const updatedProds3 = await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      const updatedProds4 = await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      const updatedProds5 = await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      const updatedProds6 = await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
      const updatedProds7 = await Product.updateOne(
        {
          _id: newProductStocks[6]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[6].countInStock,
          },
        }
      );
      const updatedProds8 = await Product.updateOne(
        {
          _id: newProductStocks[7]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[7].countInStock,
          },
        }
      );
      const updatedProds9 = await Product.updateOne(
        {
          _id: newProductStocks[8]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[8].countInStock,
          },
        }
      );
      const updatedProds10 = await Product.updateOne(
        {
          _id: newProductStocks[9]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[9].countInStock,
          },
        }
      );
    await db.disconnect();
    res.status(201).send({message: 'updated'});
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Please make an order of 3 products per order' });
  }

});

export default handler;
