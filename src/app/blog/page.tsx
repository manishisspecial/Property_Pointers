import Link from "next/link";
import { Calendar, Eye, ArrowRight, BookOpen, Search, Clock, TrendingUp, Mail } from "lucide-react";
import prisma from "@/lib/prisma";
import { blogBylineDisplay, formatDate } from "@/lib/utils";

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

function readTime(content: string) {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}

async function getBlogPosts(category?: string, search?: string) {
  try {
    const where: any = { published: true };
    if (category && category !== "all") {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }
    return await prisma.blogPost.findMany({
      where,
      include: { author: { select: { name: true, avatar: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

async function getPopularPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      select: { title: true, slug: true, views: true, coverImage: true, createdAt: true },
      orderBy: { views: "desc" },
      take: 5,
    });
  } catch {
    return [];
  }
}

interface Props {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { category, search } = await searchParams;
  const [posts, popularPosts] = await Promise.all([
    getBlogPosts(category, search),
    getPopularPosts(),
  ]);

  const featured = !category && !search ? (posts.find((p) => p.views > 0) || posts[0]) : null;
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts;
  const activeCategory = category || "all";

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
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Expert insights, market trends, buying guides, and investment tips to help you make smarter real estate decisions.
          </p>

          {/* Search Bar */}
          <form action="/blog" method="GET" className="max-w-xl mx-auto relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="search"
              defaultValue={search || ""}
              placeholder="Search articles, guides, tips..."
              className="w-full pl-12 pr-28 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-sm"
            />
            {category && <input type="hidden" name="category" value={category} />}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gold-500 hover:bg-gold-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const href = cat.value === "all"
                ? (search ? `/blog?search=${search}` : "/blog")
                : (search ? `/blog?category=${cat.value}&search=${search}` : `/blog?category=${cat.value}`);
              const isActive = activeCategory === cat.value;
              return (
                <Link
                  key={cat.value}
                  href={href}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-navy-800 text-white"
                      : "text-gray-600 hover:bg-navy-50 hover:text-navy-800"
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active filter indicator */}
      {(category || search) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center gap-3 flex-wrap">
            {search && (
              <span className="inline-flex items-center gap-1.5 bg-gold-50 text-gold-700 px-3 py-1.5 rounded-full text-sm font-medium">
                Results for &ldquo;{search}&rdquo;
                <Link href={category ? `/blog?category=${category}` : "/blog"} className="ml-1 hover:text-gold-900">&times;</Link>
              </span>
            )}
            {category && (
              <span className="inline-flex items-center gap-1.5 bg-navy-50 text-navy-700 px-3 py-1.5 rounded-full text-sm font-medium capitalize">
                {category.replace("-", " ")}
                <Link href={search ? `/blog?search=${search}` : "/blog"} className="ml-1 hover:text-navy-900">&times;</Link>
              </span>
            )}
            <Link href="/blog" className="text-sm text-gray-500 hover:text-red-500 font-medium">
              Clear all
            </Link>
            <span className="text-sm text-gray-400">{posts.length} article{posts.length !== 1 ? "s" : ""} found</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {search ? "No articles found" : "Coming Soon!"}
            </h3>
            <p className="text-gray-500 mb-4">
              {search
                ? `No results for "${search}". Try a different search term.`
                : "We're working on amazing content for you. Check back soon!"}
            </p>
            {search && (
              <Link href="/blog" className="btn-primary inline-block">
                View All Articles
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Featured Post */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="block mb-10 group">
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="h-64 md:h-80 bg-gray-200 overflow-hidden relative">
                      {featured.coverImage ? (
                        <img src={featured.coverImage} alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
                          <BookOpen size={64} className="text-navy-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                          FEATURED
                        </span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full capitalize">
                          {featured.category.replace("-", " ")}
                        </span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Calendar size={14} /> {formatDate(featured.createdAt)}
                        </span>
                        <span className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock size={14} /> {readTime(featured.content)} min read
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-gray-500 mb-4 leading-relaxed line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-navy-800 flex items-center justify-center text-white text-sm font-bold">
                            {blogBylineDisplay(featured.byline, featured.author.name)[0]}
                          </div>
                          <span className="text-sm text-gray-600">{blogBylineDisplay(featured.byline, featured.author.name)}</span>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-2.5 py-0.5 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full capitalize">
                          {post.category.replace("-", " ")}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-0.5">
                          <Clock size={10} /> {readTime(post.content)} min
                        </span>
                      </div>
                      <h3 className="font-bold text-navy-800 text-lg mb-2 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-navy-800 flex items-center justify-center text-white text-[10px] font-bold">
                            {blogBylineDisplay(post.byline, post.author.name)[0]}
                          </div>
                          <span className="text-xs text-gray-500">{blogBylineDisplay(post.byline, post.author.name)}</span>
                        </div>
                        <span className="text-gold-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Popular Posts */}
              {popularPosts.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-navy-900 mb-5">
                    <TrendingUp size={20} className="text-gold-500" />
                    Trending Articles
                  </h3>
                  <div className="space-y-4">
                    {popularPosts.map((post, i) => (
                      <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
                        <span className="shrink-0 w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center text-sm font-bold text-navy-400 group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-navy-800 line-clamp-2 group-hover:text-gold-600 transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
                            <span className="text-xs text-gray-400 flex items-center gap-0.5">
                              <Eye size={10} /> {post.views}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Widget */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-navy-900 mb-4">Categories</h3>
                <div className="space-y-1">
                  {CATEGORIES.filter((c) => c.value !== "all").map((cat) => (
                    <Link
                      key={cat.value}
                      href={`/blog?category=${cat.value}`}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        activeCategory === cat.value
                          ? "bg-navy-800 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-6 text-white">
                <div className="w-12 h-12 bg-gold-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={24} className="text-gold-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  Get the latest real estate insights, market trends, and expert tips delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                  />
                  <button
                    type="button"
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                  >
                    Subscribe Now
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3">No spam. Unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
