import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  const orderItems = req.body.orderItems;
  //console.log(orderItems);

  await db.connect();
    for (const i of orderItems) {
      const p = await Product.findById(i._id);
      await Product.updateOne(
          { _id: i._id, "sizes.psize": i.csize.psize},
          {
            $set: {
              "sizes.$.count" : i.csize.count - i.quantity,
              "ordered" : p.ordered + i.quantity,
            }
          }
        );
    }
    await db.disconnect();
    res.status(201).send({message: 'updated'});

});

export default handler;
