import nc from 'next-connect';
import db from '../../../utils/db';
import onError from '../../../utils/error';
import Transaction from '../../../models/Transaction';

const handler = nc({
  onError,
});

handler.post(async (req, res ) => {
  const received = req.body.phone;
  const receivedamt = req.body.amount;
  const dynamic = received.slice(1);
  console.log(dynamic);
  
  const amount = 0+receivedamt;
  const phone = 254+dynamic;
  console.log(phone);
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await db.connect();
  const transaction = await Transaction.find({createdAt : {$gte: new Date().getTime()-(7*60*1000) }, Amount: amount, Phone: phone });
  console.log(transaction);
  if (transaction.length > 0) {
    await db.disconnect();
    res.status(200).send({ message: 'Transaction Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Transaction Not Found' });
  }

});

export default handler;