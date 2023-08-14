import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  const pageSize = 24;
  const curPage = req.query.page || 2

  await db.connect();
  const offers = await Product.find(
    { isOnoffer: true },
    )
      .lean()
      .sort({
        rating: -1,
        createdAt: -1,
      })
      .limit(pageSize * curPage)
      .skip( (curPage - 1) * pageSize );  
      const totalpicks = await Product.find({ isOnoffer: true }).countDocuments();  
  await db.disconnect();
  const maxPage = Math.ceil(totalpicks / pageSize);

  res.send({offers, maxPage});
});

export default handler;
