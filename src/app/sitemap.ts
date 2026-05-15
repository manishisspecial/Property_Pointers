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
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights/market-trends`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insights/city-reports`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/insights/investment-guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
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
