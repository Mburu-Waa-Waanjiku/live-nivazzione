import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
 
const handler = nc();

handler.get(async (req, res) => {
  const pageSize = 24;
  const curPage = req.query.page || 2

  await db.connect();
  const earrings = await Product.find(
    { category: 'Earrings', isCollectn: false },
    )
      .lean()
      .sort({
        createdAt: -1,
      })
      .limit(pageSize * curPage)
      .skip( (curPage - 1) * pageSize );  
    const totalpicks = await Product.find({ category: 'Earrings' }).countDocuments();  
  await db.disconnect();
  const maxPage = Math.ceil(totalpicks / pageSize);
  
  res.send({earrings, maxPage});
});

export default handler;
