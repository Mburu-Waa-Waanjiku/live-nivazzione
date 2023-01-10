import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  const pageSize = 16;
  const curPage = req.query.page || 1

  await db.connect();
  const waistbeads = await Product.find(
    { category: 'Waist Beads' },
    )
      .lean()
      .sort({
        rating: -1,
      })
      .limit(pageSize * curPage);  
    const totalpicks = await Product.find({ category: 'Waist Beads' }).countDocuments();  
  await db.disconnect();
  const maxPage = Math.ceil(totalpicks / pageSize);

  res.send({waistbeads, maxPage});
});

export default handler;
