import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';
import onError from '../../../../utils/error';
import { isAuth } from '../../../../utils/auth';
import axios from 'axios';

const handler = nc({
  onError,
});
handler.use(isAuth);
handler.put(async (req, res ) => {
  const data = { amount : "1", msisdn: "0704065652", account_no: "200"};
  const url = " https://tinypesa.com/api/v1/express/initialize";

fetch(url, {
    body: JSON.stringify(data),
    headers: {
        Apikey: "erwyuweoyf",
        "Content-Type": "application/json",
    },
    method: "POST",
}).then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error(error);
  });


  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'order paid', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'order not found' });
  }
});

export default handler;
