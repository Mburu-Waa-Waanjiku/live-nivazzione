import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  const pageSize = 24;
  const curPage = req.query.page || 2

  await db.connect();
  const newprods = await Product.find(
    { isNeww: true },
    )
      .lean()
      .sort({
        createdAt: -1,
        rating: -1,
      })
      .limit(pageSize * curPage)  
      .skip( (curPage - 1) * pageSize );  
      const totalpicks = await Product.find({ isNeww: true }).countDocuments();  
  await db.disconnect();
  const maxPage = Math.ceil(totalpicks / pageSize);

  res.send({newprods, maxPage});
});

export default handler;
