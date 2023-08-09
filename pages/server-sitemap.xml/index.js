import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  let posts = await fetch("https://www.shiglam.com/api/products");
  posts = await posts.json();

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