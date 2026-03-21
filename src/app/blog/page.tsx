import Link from "next/link";
import { Calendar, Eye, User, ArrowRight, Tag, BookOpen } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog - Property Pointers | Real Estate Tips, Guides & Market Insights",
  description: "Read expert articles on property buying, selling, renting, market trends, investment tips, home loans, and real estate guides for India.",
  keywords: "real estate blog, property tips, home buying guide, property investment, market trends, Noida real estate, Delhi NCR properties",
};

const CATEGORIES = [
  { value: "all", label: "All Posts" },
  { value: "buying-guide", label: "Buying Guide" },
  { value: "selling-tips", label: "Selling Tips" },
  { value: "market-trends", label: "Market Trends" },
  { value: "investment", label: "Investment" },
  { value: "home-loans", label: "Home Loans" },
  { value: "legal", label: "Legal & RERA" },
  { value: "interior", label: "Interior & Vastu" },
  { value: "nri", label: "NRI Guide" },
];

async function getBlogPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      include: { author: { select: { name: true, avatar: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const featured = posts.find((p) => p.views > 0) || posts[0];
  const rest = posts.filter((p) => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="gradient-navy py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            <BookOpen size={16} className="text-gold-400" />
            <span className="text-gold-400 text-sm font-medium">Real Estate Knowledge Hub</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Property Pointers <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Expert insights, market trends, buying guides, and investment tips to help you make smarter real estate decisions.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <Link key={cat.value} href={cat.value === "all" ? "/blog" : `/blog?category=${cat.value}`}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-navy-50 hover:text-navy-800 transition-colors">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Coming Soon!</h3>
            <p className="text-gray-500">We&apos;re working on amazing content for you. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="block mb-12 group">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-64 lg:h-auto bg-gray-200 overflow-hidden">
                    {featured.coverImage ? (
                      <img src={featured.coverImage} alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
                        <BookOpen size={64} className="text-navy-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full capitalize">
                        {featured.category.replace("-", " ")}
                      </span>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Calendar size={14} /> {formatDate(featured.createdAt)}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-white text-sm font-bold">
                          {featured.author.name[0]}
                        </div>
                        <span className="text-sm text-gray-600">{featured.author.name}</span>
                      </div>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Eye size={14} /> {featured.views} views
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Post Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="card group block">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
                        <BookOpen size={40} className="text-navy-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full capitalize">
                        {post.category.replace("-", " ")}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="font-bold text-navy-800 text-lg mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-navy-800 flex items-center justify-center text-white text-[10px] font-bold">
                          {post.author.name[0]}
                        </div>
                        <span className="text-xs text-gray-500">{post.author.name}</span>
                      </div>
                      <span className="text-gold-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
