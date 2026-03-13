/**
 * Daily Automated Blog Generator
 * Runs daily to generate new SEO-optimized blog posts
 * Uses Claude API to create unique, high-quality content
 * Updated: 2026-03-14
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Blog post templates targeting different keywords daily
const BLOG_TEMPLATES = [
  {
    keyword: "how to merge pdf files",
    category: "PDF Tools",
    relatedTools: ["merge-pdf", "split-pdf", "compress-pdf"],
    description: "Complete guide to merging PDF files with different methods",
  },
  {
    keyword: "compress pdf without losing quality",
    category: "PDF Tools",
    relatedTools: ["compress-pdf", "merge-pdf"],
    description: "Techniques for reducing PDF file size while maintaining quality",
  },
  {
    keyword: "remove background from image ai",
    category: "Image Tools",
    relatedTools: ["remove-bg", "compress-image"],
    description: "Using AI to automatically remove backgrounds from photos",
  },
  {
    keyword: "best free pdf tools",
    category: "PDF Tools",
    relatedTools: ["merge-pdf", "compress-pdf", "split-pdf", "pdf-to-word"],
    description: "Comprehensive review of top free PDF tools in 2026",
  },
  {
    keyword: "pdf merger online free",
    category: "PDF Tools",
    relatedTools: ["merge-pdf", "split-pdf"],
    description: "Free online solutions for combining multiple PDF files",
  },
  {
    keyword: "image compression tool free",
    category: "Image Tools",
    relatedTools: ["compress-image", "remove-bg"],
    description: "Best free tools for compressing and optimizing images",
  },
  {
    keyword: "background remover online",
    category: "Image Tools",
    relatedTools: ["remove-bg", "compress-image", "upscale-image"],
    description: "Online tools for removing backgrounds from any image",
  },
  {
    keyword: "split pdf online",
    category: "PDF Tools",
    relatedTools: ["split-pdf", "merge-pdf"],
    description: "How to split and extract pages from PDF documents",
  },
];

interface BlogPost {
  title: string;
  slug: string;
  metaDescription: string;
  readingTime: string;
  author: string;
  publishDate: string;
  category: string;
  content: string;
  internalLinks: string[];
  targetKeywords: string[];
  status: string;
}

async function generateBlogPost(
  template: (typeof BLOG_TEMPLATES)[0]
): Promise<BlogPost> {
  const prompt = `Generate a professional, SEO-optimized blog post for a free online PDF and image tool website with these specifications:

TARGET KEYWORD: "${template.keyword}"
CATEGORY: ${template.category}
RELATED TOOLS: ${template.relatedTools.join(", ")}

REQUIREMENTS:
- Title: Create an engaging, keyword-optimized title
- Length: 1800-2000 words
- Structure:
  * Introduction (150-200 words) - Hook + keyword naturally
  * Use Cases (200-250 words) - 4-5 practical scenarios
  * Step-by-Step Guide (400-500 words) - Clear instructions
  * Pro Tips (200-250 words) - Expert advice
  * FAQ Section (300-400 words) - 8-10 questions
  * Conclusion (150-200 words) - CTA + summary

- SEO Optimization:
  * Include target keyword 5-7 times naturally
  * H2 headings for all sections
  * Internal links to: ${template.relatedTools.map((t) => `[${t}](/${t})`).join(", ")}
  * Professional but friendly tone
  * Clear, scannable formatting

- Meta Description: 155-160 characters, keyword-focused

OUTPUT AS JSON:
{
  "title": "Your Title Here",
  "slug": "url-slug-format",
  "metaDescription": "155-char description with keyword",
  "readingTime": "X min read",
  "author": "PDFA2Z Team",
  "publishDate": "${new Date().toISOString().split("T")[0]}",
  "category": "${template.category}",
  "content": "Full markdown content here...",
  "internalLinks": ${JSON.stringify(template.relatedTools)},
  "targetKeywords": ["${template.keyword}", "related keyword 2"],
  "status": "ready-to-publish"
}

Generate high-quality, unique content now.`;

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  // Extract JSON from response
  const content = response.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  // Parse JSON from the response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Could not extract JSON from response");
  }

  const blogPost: BlogPost = JSON.parse(jsonMatch[0]);
  return blogPost;
}

async function saveBlogPost(post: BlogPost): Promise<void> {
  const blogDir = path.join(
    process.cwd(),
    "src",
    "content",
    "blog",
    post.slug
  );

  // Create directory if it doesn't exist
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // Save post metadata
  const metadata = {
    title: post.title,
    slug: post.slug,
    metaDescription: post.metaDescription,
    readingTime: post.readingTime,
    author: post.author,
    publishDate: post.publishDate,
    category: post.category,
    internalLinks: post.internalLinks,
    targetKeywords: post.targetKeywords,
    status: post.status,
  };

  fs.writeFileSync(
    path.join(blogDir, "metadata.json"),
    JSON.stringify(metadata, null, 2)
  );

  // Save post content
  fs.writeFileSync(path.join(blogDir, "content.md"), post.content);

  console.log(`✅ Blog post saved: ${post.slug}`);
  console.log(`   Title: ${post.title}`);
  console.log(`   Directory: ${blogDir}`);
}

async function updateBlogIndex(post: BlogPost): Promise<void> {
  const indexPath = path.join(process.cwd(), "src", "content", "blog-index.json");

  let index: any[] = [];
  if (fs.existsSync(indexPath)) {
    const data = fs.readFileSync(indexPath, "utf-8");
    index = JSON.parse(data);
  }

  // Add new post to index (most recent first)
  index.unshift({
    title: post.title,
    slug: post.slug,
    metaDescription: post.metaDescription,
    publishDate: post.publishDate,
    category: post.category,
    readingTime: post.readingTime,
    targetKeywords: post.targetKeywords,
  });

  // Keep only last 100 posts in index
  index = index.slice(0, 100);

  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
  console.log(`✅ Blog index updated`);
}

async function main(): Promise<void> {
  try {
    console.log("🚀 Starting daily blog generation...\n");

    // Select today's template (rotate through available templates)
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
        86400000
    );
    const templateIndex = dayOfYear % BLOG_TEMPLATES.length;
    const template = BLOG_TEMPLATES[templateIndex];

    console.log(`📅 Today's focus: "${template.keyword}"\n`);

    // Generate blog post
    console.log("✍️  Generating blog post with Claude API...");
    const blogPost = await generateBlogPost(template);

    // Save blog post
    console.log("💾 Saving blog post...");
    await saveBlogPost(blogPost);

    // Update index
    console.log("📑 Updating blog index...");
    await updateBlogIndex(blogPost);

    console.log("\n✨ Blog generation completed successfully!");
    console.log(`\n📊 Post Statistics:`);
    console.log(`   - Title: ${blogPost.title}`);
    console.log(`   - Reading Time: ${blogPost.readingTime}`);
    console.log(`   - Category: ${blogPost.category}`);
    console.log(`   - Keywords: ${blogPost.targetKeywords.join(", ")}`);
    console.log(`   - Published: ${blogPost.publishDate}`);
  } catch (error) {
    console.error("❌ Error generating blog post:", error);
    process.exit(1);
  }
}

main();
