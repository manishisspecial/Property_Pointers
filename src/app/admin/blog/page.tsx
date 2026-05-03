"use client";

import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";
import {
  BookOpen, Plus, Edit, Trash2, Eye, EyeOff, CheckCircle, X, Save, Calendar,
  Upload, Loader2
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import ExportButton from "@/components/admin/ExportButton";
import type { CsvColumn } from "@/lib/csv";

function safeJsonArray(str: string | null | undefined): any[] {
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

interface FaqItem {
  question: string;
  answer: string;
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    metaTags: "",
    schemaJson: "",
    coverImage: "",
    category: "general",
    tags: "",
    byline: "",
    faqs: [{ question: "", answer: "" }, { question: "", answer: "" }, { question: "", answer: "" }] as FaqItem[],
    published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/blog?all=true&limit=100");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {}
    setLoading(false);
  }

  function openEditor(post?: any) {
    if (post) {
      setEditingPost(post);
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle || "",
        metaDescription: post.metaDescription || "",
        metaTags: JSON.parse(post.metaTags || "[]").join(", "),
        schemaJson: post.schemaJson || "",
        coverImage: post.coverImage || "",
        category: post.category,
        tags: JSON.parse(post.tags || "[]").join(", "),
        byline: post.byline || "",
        faqs: (() => {
          const parsed = JSON.parse(post.faqs || "[]");
          const normalized = Array.isArray(parsed) ? parsed : [];
          const firstThree = normalized.slice(0, 3);
          while (firstThree.length < 3) {
            firstThree.push({ question: "", answer: "" });
          }
          return firstThree;
        })(),
        published: post.published,
      });
    } else {
      setEditingPost(null);
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        metaTags: "",
        schemaJson: "",
        coverImage: "",
        category: "general",
        tags: "",
        byline: "",
        faqs: [{ question: "", answer: "" }, { question: "", answer: "" }, { question: "", answer: "" }],
        published: false,
      });
    }
    setShowEditor(true);
  }

  function updateFaq(index: number, field: "question" | "answer", value: string) {
    setForm((prev) => {
      const nextFaqs = [...prev.faqs];
      nextFaqs[index] = { ...nextFaqs[index], [field]: value };
      return { ...prev, faqs: nextFaqs };
    });
  }

  async function savePost() {
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const metaTags = form.metaTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const faqs = form.faqs
      .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
      .filter((f) => f.question && f.answer);

    const body = {
      ...form,
      slug: toSlug(form.slug || form.title),
      tags,
      metaTags,
      faqs,
    };

    try {
      if (editingPost) {
        await fetch(`/api/blog/${editingPost.slug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      setShowEditor(false);
      fetchPosts();
    } catch {}
  }

  async function deletePost(slug: string) {
    if (!confirm("Delete this blog post?")) return;
    try {
      await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      fetchPosts();
    } catch {}
  }

  async function togglePublish(slug: string, published: boolean) {
    try {
      await fetch(`/api/blog/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !published }),
      });
      fetchPosts();
    } catch {}
  }

  const blogExportColumns: CsvColumn<any>[] = [
    { header: "ID", accessor: (p) => p.id },
    { header: "Title", accessor: (p) => p.title },
    { header: "Slug", accessor: (p) => p.slug },
    { header: "Category", accessor: (p) => p.category },
    { header: "Tags", accessor: (p) => safeJsonArray(p.tags).join("; ") },
    { header: "Excerpt", accessor: (p) => p.excerpt },
    { header: "Author", accessor: (p) => p.byline || p.author?.name || "" },
    { header: "Published", accessor: (p) => Boolean(p.published) },
    { header: "Views", accessor: (p) => p.views ?? 0 },
    { header: "Meta Title", accessor: (p) => p.metaTitle || "" },
    { header: "Meta Description", accessor: (p) => p.metaDescription || "" },
    { header: "Created At", accessor: (p) => p.createdAt },
    { header: "Updated At", accessor: (p) => p.updatedAt || "" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Blog Management</h1>
          <p className="text-sm text-gray-500">{posts.length} blog posts</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton
            data={posts}
            columns={blogExportColumns}
            filename="propertypointers-blog"
          />
          <button onClick={() => openEditor()} className="btn-primary flex items-center gap-2">
            <Plus size={18} /> New Post
          </button>
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto pt-20 pb-10 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-navy-900">
                {editingPost ? "Edit Post" : "New Blog Post"}
              </h2>
              <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="input-field" placeholder="Enter blog post title" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: toSlug(e.target.value) })}
                  className="input-field"
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Author name (shown on post)</label>
                <input
                  type="text"
                  value={form.byline}
                  onChange={(e) => setForm({ ...form, byline: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Gaurav Chopra — appears in the byline instead of your account name"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to use your account display name.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt (SEO Description)</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="input-field resize-none" rows={2} placeholder="Brief summary for SEO and previews..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    value={form.metaTitle}
                    onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                    className="input-field"
                    placeholder="Custom SEO title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={form.metaTags}
                    onChange={(e) => setForm({ ...form, metaTags: e.target.value })}
                    className="input-field"
                    placeholder="real estate, noida, buying guide"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Meta Description</label>
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                  className="input-field resize-none"
                  rows={3}
                  placeholder="Search result description for this article..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                    <option value="general">General</option>
                    <option value="buying-guide">Buying Guide</option>
                    <option value="selling-tips">Selling Tips</option>
                    <option value="market-trends">Market Trends</option>
                    <option value="investment">Investment</option>
                    <option value="home-loans">Home Loans</option>
                    <option value="legal">Legal & RERA</option>
                    <option value="interior">Interior & Vastu</option>
                    <option value="nri">NRI Guide</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags (comma-separated)</label>
                  <input type="text" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="input-field" placeholder="real estate, noida, tips" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Image</label>
                <BlogCoverUploader
                  image={form.coverImage}
                  onChange={(url) => setForm({ ...form, coverImage: url })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
                <RichTextEditor
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
                  placeholder="Write your blog content with formatting, links, and media..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schema Editor (JSON-LD)</label>
                <textarea
                  value={form.schemaJson}
                  onChange={(e) => setForm({ ...form, schemaJson: e.target.value })}
                  className="input-field resize-none font-mono text-xs"
                  rows={6}
                  placeholder='{"@context":"https://schema.org","@type":"Article"}'
                />
              </div>

              <div className="border rounded-xl p-4 bg-gray-50">
                <h3 className="text-sm font-semibold text-navy-900 mb-3">FAQ</h3>
                <div className="space-y-4">
                  {form.faqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <label className="block text-xs font-medium text-gray-600">
                        FAQ Question {index + 1}
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(index, "question", e.target.value)}
                        className="input-field"
                        placeholder={`Enter FAQ Question ${index + 1}`}
                      />
                      <label className="block text-xs font-medium text-gray-600">
                        FAQ Answer {index + 1}
                      </label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, "answer", e.target.value)}
                        className="input-field resize-none"
                        rows={3}
                        placeholder={`Enter FAQ Answer ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4 accent-gold-500" />
                  <span className="text-sm font-medium text-gray-700">Publish immediately</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t">
              <button onClick={() => setShowEditor(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium">
                Cancel
              </button>
              <button onClick={savePost} className="btn-primary flex items-center gap-2">
                <Save size={16} /> {editingPost ? "Update Post" : "Create Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Post</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Views</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded bg-gray-200 overflow-hidden shrink-0">
                        {post.coverImage ? (
                          <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen size={16} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-navy-800 line-clamp-1">{post.title}</p>
                        <p className="text-xs text-gray-400">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs capitalize">
                      {post.category.replace("-", " ")}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    <Eye size={14} className="inline mr-1" />{post.views}
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-400">
                    <Calendar size={12} className="inline mr-1" />{formatDate(post.createdAt)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEditor(post)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100" title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => togglePublish(post.slug, post.published)}
                        className={`p-1.5 rounded-lg ${post.published ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
                        title={post.published ? "Unpublish" : "Publish"}>
                        {post.published ? <EyeOff size={14} /> : <CheckCircle size={14} />}
                      </button>
                      <button onClick={() => deletePost(post.slug)} className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {posts.length === 0 && !loading && (
          <div className="p-12 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-500 mb-4">Create your first blog post to drive SEO traffic</p>
            <button onClick={() => openEditor()} className="btn-primary inline-flex items-center gap-2">
              <Plus size={16} /> Create First Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCoverUploader({ image, onChange }: { image: string; onChange: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "blog");
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch (err) {
      console.error("Upload failed:", err);
    }
    setUploading(false);
  }

  return (
    <div>
      {image ? (
        <div className="relative inline-block">
          <img src={image} alt="Cover" className="h-32 rounded-lg object-cover" />
          <button type="button" onClick={() => onChange("")}
            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
            <X size={12} />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gold-400 hover:bg-gray-50 transition-colors"
        >
          {uploading ? (
            <Loader2 size={24} className="animate-spin text-gold-500" />
          ) : (
            <>
              <Upload size={24} className="text-gray-400 mb-1" />
              <span className="text-sm text-gray-500">Click or drag to upload cover image</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} disabled={uploading} />
        </label>
      )}
    </div>
  );
}
