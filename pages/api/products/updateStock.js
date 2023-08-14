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

      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[6]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[6].countInStock,
          },
        }
      );
      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[6]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[6].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[7]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[7].countInStock,
          },
        }
      );
      await Product.updateOne(
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

      await Product.updateOne(
        {
          _id: newProductStocks[0]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[0].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[1]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[1].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[2]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[2].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[3]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[3].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[4]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[4].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[5]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[5].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[6]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[6].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[7]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[7].countInStock,
          },
        }
      );
      await Product.updateOne(
        {
          _id: newProductStocks[8]._id,
        },
        {
          $set: {
            countInStock: newProductStocks[8].countInStock,
          },
        }
      );
      await Product.updateOne(
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
