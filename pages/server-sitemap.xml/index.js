import { getServerSideSitemap } from "next-sitemap";
import axios from 'axios'

export const getServerSideProps = async (ctx) => {
  const posts = await axios.get(`/api/products`);

  const newsSitemaps = posts.map((item) => ({
    loc: `${process.env.DOMAIN_URL}/${item.category}/${item.slug}`,
    lastmod: new Date().toISOString(),
    changefreq: "weekly",
    priority: "1"
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}