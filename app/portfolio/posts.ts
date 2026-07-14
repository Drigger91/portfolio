import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { PostMeta, PostStatus } from "./content";

// Server-only: reads markdown files from /posts. Never import from a client component.
const POSTS_DIR = path.join(process.cwd(), "posts");

function isMarkdown(file: string): boolean {
  return /\.md$/i.test(file) && !file.startsWith("_") && file.toLowerCase() !== "readme.md";
}

function readRaw(slug: string): { data: Record<string, unknown>; content: string } | null {
  try {
    const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf-8");
    const parsed = matter(raw);
    return { data: parsed.data, content: parsed.content };
  } catch {
    return null;
  }
}

function toMeta(slug: string, data: Record<string, unknown>, content: string): PostMeta {
  const rawStatus = data.status;
  const status: PostStatus =
    rawStatus === "drafting" || rawStatus === "idea" ? rawStatus : "published";
  const date = data.date ? new Date(data.date as string).toISOString().slice(0, 10) : "";
  return {
    slug,
    title: String(data.title || slug),
    date,
    blurb: String(data.blurb || ""),
    status,
    external: data.external ? String(data.external) : undefined,
    hasContent: content.trim().length > 0,
  };
}

export function getAllSlugs(): string[] {
  try {
    return fs
      .readdirSync(POSTS_DIR)
      .filter(isMarkdown)
      .map((f) => f.replace(/\.md$/i, ""));
  } catch {
    return [];
  }
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const parsed = readRaw(slug);
      return parsed ? toMeta(slug, parsed.data, parsed.content) : null;
    })
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const parsed = readRaw(slug);
  if (!parsed) return null;
  return { meta: toMeta(slug, parsed.data, parsed.content), content: parsed.content };
}
