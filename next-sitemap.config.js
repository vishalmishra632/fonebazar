/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://fonebazaar.ca",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: "./out",
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/_next/"] },
      { userAgent: "GPTBot", disallow: "/" },
    ],
  },
  transform: async (config, path) => {
    let priority = 0.5;
    let changefreq = "monthly";

    if (path === "/") {
      priority = 1.0;
      changefreq = "weekly";
    } else if (path.startsWith("/products") || path.startsWith("/services")) {
      priority = 0.8;
      changefreq = "weekly";
    } else if (["/about", "/contact", "/store"].some((p) => path.startsWith(p))) {
      priority = 0.6;
      changefreq = "monthly";
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
