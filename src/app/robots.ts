import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
      return {
            rules: {
                  userAgent: "*",
                  allow: "/",
                  disallow: ["/dashboard/", "/settings/", "/notifcations/"],
            },
            sitemap: `${process.env.NEXT_PUBLIC_CLIENT_URL}/sitemap.xml`,
      };
}
