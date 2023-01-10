import nc from 'next-connect';
import onError from '../../utils/error';
import axios from 'axios';
 
const handler = nc({
  onError,
});
handler.post(async (req, res ) => { 
  const mpesares = req.body.Body.stkCallback;
  console.log(mpesares);
  try {
    const { data } = await axios.get('http://localhost:3000/api/P4Borders/pay',
    { mpesares }
    )
  } catch (err){
    console.log(err);
  }
  res.status(200).end()
});

export default handler;
