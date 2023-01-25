const siteUrl = process.env.DOMAIN_URL;
const config = {
    siteUrl,
    generateRobotsTxt: true, 
    robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/404", "/admin/banners", "/admin/dashboard", "/admin/orders", "/admin/products", "/admin/rcustomers", "/admin/users", "/order-history", "/placeorder", "/profile", "/shipping" ],
      },
      { userAgent: "*", 
        allow: "/",
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap-0.xml`,
      `${siteUrl}/server-sitemap.xml`,
    ],
  },
  };
 
module.exports = config;