import Link from "next/link";
import {
  Calendar, Eye, ArrowLeft, Tag, Clock, BookOpen,
  Facebook, Twitter, Linkedin, Link2, ChevronRight
} from "lucide-react";
import prisma from "@/lib/prisma";
import { blogBylineDisplay, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

interface FaqItem {
  question: string;
  answer: string;
}

function parseJsonArray(value: string, fallback: any[] = []) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };
  const tags = parseJsonArray(post.metaTags || post.tags || "[]");
  const metaTitle = post.metaTitle || `${post.title} | Property Pointers Blog`;
  const metaDescription = post.metaDescription || post.excerpt;
  return {
    title: metaTitle,
    description: metaDescription,
    keywords: tags.join(", "),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
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

  const authorName = blogBylineDisplay(post.byline, post.author.name);
  const authorInitial = authorName.charAt(0);

  await prisma.blogPost.update({ where: { slug }, data: { views: { increment: 1 } } });

  const tags: string[] = parseJsonArray(post.tags || "[]");
  const faqs: FaqItem[] = parseJsonArray(post.faqs || "[]");
  const autoFaqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;
  const customSchema = post.schemaJson ? post.schemaJson.trim() : "";

  const relatedPosts = await prisma.blogPost.findMany({
    where: { published: true, category: post.category, id: { not: post.id } },
    select: { title: true, slug: true, coverImage: true, createdAt: true, excerpt: true, content: true, category: true },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const readTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200));
  const shareUrl = `https://propertypointers.com/blog/${slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Cover */}
      {post.coverImage && (
        <div className="h-[300px] md:h-[450px] relative bg-gray-200">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-0 right-0">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <span className="px-3 py-1 bg-gold-500 text-white text-sm font-semibold rounded-full capitalize">
                {post.category.replace("-", " ")}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gold-500">Home</Link>
          <ChevronRight size={14} />
          <Link href="/blog" className="hover:text-gold-500">Blog</Link>
          <ChevronRight size={14} />
          <Link href={`/blog?category=${post.category}`} className="hover:text-gold-500 capitalize">
            {post.category.replace("-", " ")}
          </Link>
          <ChevronRight size={14} />
          <span className="text-navy-800 font-medium truncate max-w-[200px]">{post.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
              {customSchema && (
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: customSchema }}
                />
              )}
              {autoFaqSchema && (
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(autoFaqSchema) }}
                />
              )}

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {!post.coverImage && (
                  <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm font-semibold rounded-full capitalize">
                    {post.category.replace("-", " ")}
                  </span>
                )}
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Calendar size={14} /> {formatDate(post.createdAt)}
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Clock size={14} /> {readTime} min read
                </span>
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <Eye size={14} /> {post.views.toLocaleString()} views
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-navy-900 leading-tight mb-6">
                {post.title}
              </h1>

              <p className="text-lg text-gray-500 mb-8 border-l-4 border-gold-500 pl-4 italic">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center justify-between gap-3 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center text-white text-lg font-bold">
                    {authorInitial}
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">{authorName}</p>
                    <p className="text-sm text-gray-500 capitalize">{post.author.role} at Property Pointers</p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 hidden sm:block mr-1">Share:</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                    title="Share on Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 hover:bg-sky-100 transition-colors"
                    title="Share on Twitter"
                  >
                    <Twitter size={16} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 hover:bg-blue-100 transition-colors"
                    title="Share on LinkedIn"
                  >
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="blog-content">
                <div
                  className="prose prose-gray max-w-none prose-headings:text-navy-900 prose-a:text-gold-600"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* FAQs */}
              {faqs.length > 0 && (
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h2 className="text-2xl font-bold text-navy-900 mb-5">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={`${faq.question}-${index}`} className="rounded-xl border border-gray-200 p-4">
                        <h3 className="font-semibold text-navy-900 mb-2">{faq.question}</h3>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag size={16} className="text-gray-400" />
                    {tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-navy-50 hover:text-navy-700 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Share Bar */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600">Found this helpful? Share it!</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Facebook size={14} /> Facebook
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-sky-50 text-sky-500 text-xs font-medium hover:bg-sky-100 transition-colors"
                    >
                      <Twitter size={14} /> Twitter
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-50 text-green-600 text-xs font-medium hover:bg-green-100 transition-colors"
                    >
                      <Link2 size={14} /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-10">
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
                        <span className="text-xs text-gold-600 font-medium capitalize">{rp.category.replace("-", " ")}</span>
                        <h4 className="font-semibold text-navy-800 group-hover:text-gold-600 transition-colors line-clamp-2 mt-1">{rp.title}</h4>
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

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <div className="w-20 h-20 rounded-full bg-navy-800 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {authorInitial}
              </div>
              <h3 className="font-bold text-navy-800 text-lg">{authorName}</h3>
              <p className="text-sm text-gray-500 capitalize mb-3">{post.author.role} at Property Pointers</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Expert in Indian real estate, helping buyers and investors make informed property decisions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-navy-900 mb-4">Explore More</h3>
              <div className="space-y-2">
                <Link href="/properties?type=sale" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-navy-50 hover:text-navy-800 transition-colors">
                  <ChevronRight size={14} /> Properties for Sale
                </Link>
                <Link href="/properties?type=rent" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-navy-50 hover:text-navy-800 transition-colors">
                  <ChevronRight size={14} /> Rental Properties
                </Link>
                <Link href="/calculator" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-navy-50 hover:text-navy-800 transition-colors">
                  <ChevronRight size={14} /> EMI Calculator
                </Link>
                <Link href="/post-property" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-gold-600 hover:bg-gold-50 font-medium transition-colors">
                  <ChevronRight size={14} /> Post Property FREE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
