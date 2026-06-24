import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.propertypointers.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Tools hub + 12 tool pages
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/tools/emi-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${baseUrl}/tools/home-loan-eligibility`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/affordability-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/stamp-duty-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/roi-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/rental-yield-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/rent-vs-buy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/construction-cost`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/rera-check`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/area-converter`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/vastu-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/ai-advisor`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.75 },

    // Insights hub + 8 insight pages
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/insights/market-trends`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights/city-reports`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights/market-news`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights/rera-updates`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights/investment-guides`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights/nri-corner`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights/ai-advisor`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },

    // Developers hub + 7 sub pages
    { url: `${baseUrl}/developers`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/developers/top`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/developers/rera-verified`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/developers/explore`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/developers/compare`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/developers/reviews`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/developers/delivery-tracker`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/developers/join`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },

    // Realty Advisors hub + 7 sub pages
    { url: `${baseUrl}/realty-advisors`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/realty-advisors/top`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/realty-advisors/verified`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/realty-advisors/nri`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/realty-advisors/find`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/realty-advisors/compare`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/realty-advisors/reviews`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/realty-advisors/join`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },

    // Vendors
    { url: `${baseUrl}/vendors`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  try {
    // Fetch dynamic properties
    const properties = await prisma.property.findMany({
      select: { id: true, updatedAt: true },
      where: { status: "active" },
      take: 5000, // Sitemap limit per file
    });

    const propertyPages = properties.map((prop) => ({
      url: `${baseUrl}/properties/${prop.id}`,
      lastModified: prop.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Fetch dynamic blog posts
    const blogs = await prisma.blogPost.findMany({
      select: { slug: true, updatedAt: true },
      where: { published: true },
      take: 5000,
    });

    const blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));

    // Fetch dynamic projects
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
      take: 5000,
    });

    const projectPages = projects.map((proj) => ({
      url: `${baseUrl}/projects/${proj.slug}`,
      lastModified: proj.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...propertyPages, ...blogPages, ...projectPages];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return staticPages;
  }
}
