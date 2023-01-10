import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';
 
const handler = nc();

handler.get(async (req, res) => {
  const pageSize = 16;
  const curPage = req.query.page || 1

  await db.connect();
  const jewelry = await Product.find(
    { category: 'Jewelry'},
    )
      .lean()
      .sort({
         createdAt: -1,
      })
      .limit(pageSize * curPage) 
      .skip( (curPage - 1) * pageSize );  
    const totalpicks = await Product.find({ category: 'Jewelry' }).countDocuments();  
  await db.disconnect();
  const maxPage = Math.ceil(totalpicks / pageSize);

  res.send({jewelry, maxPage});
});

export default handler;
