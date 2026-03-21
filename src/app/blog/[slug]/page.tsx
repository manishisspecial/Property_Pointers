import Link from "next/link";
import { Calendar, Eye, User, ArrowLeft, Tag, Clock, Share2, BookOpen } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Property Pointers Blog`,
    description: post.excerpt,
    keywords: JSON.parse(post.tags || "[]").join(", "),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { author: { select: { name: true, avatar: true, role: true } } },
  });

  if (!post || !post.published) notFound();

  await prisma.blogPost.update({ where: { slug }, data: { views: { increment: 1 } } });

  const tags: string[] = JSON.parse(post.tags || "[]");

  const relatedPosts = await prisma.blogPost.findMany({
    where: { published: true, category: post.category, id: { not: post.id } },
    select: { title: true, slug: true, coverImage: true, createdAt: true, excerpt: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const readTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Cover */}
      {post.coverImage && (
        <div className="h-[300px] md:h-[450px] relative bg-gray-200">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gold-500">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold-500">Blog</Link>
          <span>/</span>
          <span className="text-navy-800 font-medium truncate">{post.title}</span>
        </div>

        <article className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm font-semibold rounded-full capitalize">
              {post.category.replace("-", " ")}
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar size={14} /> {formatDate(post.createdAt)}
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Clock size={14} /> {readTime} min read
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Eye size={14} /> {post.views} views
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-lg text-gray-500 mb-8 border-l-4 border-gold-500 pl-4 italic">
            {post.excerpt}
          </p>

          {/* Author */}
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
            <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-white text-lg font-bold">
              {post.author.name[0]}
            </div>
            <div>
              <p className="font-semibold text-navy-800">{post.author.name}</p>
              <p className="text-sm text-gray-500 capitalize">{post.author.role} at Property Pointers</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={16} className="text-gray-400" />
                {tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-navy-900 mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="card group block">
                  <div className="h-40 bg-gray-200 overflow-hidden">
                    {rp.coverImage ? (
                      <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-100 to-navy-200">
                        <BookOpen size={32} className="text-navy-400" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors line-clamp-2">{rp.title}</h4>
                    <p className="text-xs text-gray-400 mt-2">{formatDate(rp.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="mt-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-medium">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
