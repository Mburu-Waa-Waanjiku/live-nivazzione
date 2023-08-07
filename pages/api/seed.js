import nc from 'next-connect';
 //import Product from '../../models/Product';
 //import db from '../../utils/db';
 //import Banner from '../../models/Banner';
 //import Order from '../../models/Order';
 //import Categorythumbnail from '../../models/Categorythumbnail';
 //import data from '../../utils/data';
 //import User from '../../models/User';
 //import YourPhoto from '../../models/YourPhoto';
const handler = nc();

handler.get(async (req, res) => {
 return res.send({ message: 'already seeded' });
   //await db.connect();
   //await User.deleteMany();
   //await User.insertMany(data.users);
   //await Product.deleteMany();
   //await Product.insertMany(data.products);
   //await Banner.deleteMany();
   //await Banner.insertMany(data.banner);
   //await Categorythumbnail.deleteMany();
   //await Categorythumbnail.insertMany(data.banner);
   // await Order.deleteMany();
   // await Order.insertMany(data.order);
   // await db.disconnect();
    //await YourPhoto.deleteMany();
    //await YourPhoto.insertMany(data.YourPhoto);
   //res.send({ message: 'seeded successfully' });
});

export default handler;
