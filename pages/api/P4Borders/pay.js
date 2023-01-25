import nc from 'next-connect';
import db from '../../../utils/db';
import onError from '../../../utils/error';
import Transaction from '../../../models/Transaction';
import axios from 'axios';

const handler = nc({
  onError,
});

handler.post(async (req, res ) => { 
  console.log(req.body);

    await db.connect();
      console.log("db is connected");
      const newTransaction = new Transaction({
        Phone: req.body.Body.stkCallback.CallbackMetadata.Item[4].Value,
        Code: req.body.Body.stkCallback.CallbackMetadata.Item[1].Value,
        Amount: req.body.Body.stkCallback.CallbackMetadata.Item[0].Value,
      }); 

      const transaction = await newTransaction.save();
      console.log(newTransaction);
      console.log(transaction);
    await db.disconnect(); 
    console.log('db is disconnected');
  

  res.status(200).end()
});

handler.put(async (req, res ) => {
  const key = process.env.TINY_APIKEY;
  const Amount = req.body.amount;
  const Phone = req.body.phone;

  try {
      await axios.post(
        'https://tinypesa.com/api/v1/express/initialize',
        {
          "amount" : Amount,
          "msisdn" : Phone,
        },
        {
          headers: {
            Apikey : key,
            "Content-Type" : "application/json"
          },
        } 
      )
      res.status(200).send('successful');
    } catch (err) {
      res.status(404).send('unsuccessful');
    }
});


export default handler;
