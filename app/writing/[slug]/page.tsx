import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost } from "../../portfolio/posts";
import ArticleReader from "./ArticleReader";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${d ? Number(d) + ", " : ""}${y}` : "";
}

export function generateStaticParams() {
  // Only published posts with a body get a reader route (skip external/idea entries).
  return getAllPosts()
    .filter((p) => !p.external && p.hasContent && p.status === "published")
    .map((p) => ({ slug: p.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  // Only published posts with a body are readable (external/idea/empty -> 404).
  if (!post || post.meta.external || !post.meta.hasContent || post.meta.status !== "published")
    notFound();
  const { meta, content } = post;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0d0f",
        color: "#e6e7ea",
        fontFamily: "'JetBrains Mono',ui-monospace,monospace",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          height: 56,
          borderBottom: "1px solid #1e2024",
          background: "rgba(12,13,15,.82)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <Link href="/" style={{ color: "#9498a1", fontSize: 13, textDecoration: "none" }}>
          ← back
        </Link>
        <div style={{ fontSize: 13, letterSpacing: ".02em" }}>
          <span style={{ color: "#e6e7ea", fontWeight: 500 }}>piyush</span>
          <span style={{ color: "#8fbf9f" }}>.sh</span>
          <span style={{ color: "#5c616b" }}> / writing</span>
        </div>
      </header>

      <main style={{ flex: 1, width: "100%", maxWidth: 760, margin: "0 auto", padding: "48px 24px 88px" }}>
        {meta.date && (
          <div style={{ fontSize: 13, color: "#8fbf9f", marginBottom: 14, letterSpacing: ".04em" }}>
            {fmtDate(meta.date)}
          </div>
        )}
        <h1
          style={{
            fontSize: "clamp(28px,5vw,42px)",
            lineHeight: 1.1,
            margin: "0 0 14px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#f2f3f5",
          }}
        >
          {meta.title}
        </h1>
        {meta.blurb && (
          <p
            style={{
              fontFamily: "'IBM Plex Sans',sans-serif",
              fontSize: 17,
              color: "#9498a1",
              margin: "0 0 28px",
              lineHeight: 1.5,
            }}
          >
            {meta.blurb}
          </p>
        )}
        <div style={{ borderTop: "1px solid #17191d", paddingTop: 12 }}>
          <ArticleReader markdown={content} />
        </div>

        <div style={{ marginTop: 56, borderTop: "1px solid #17191d", paddingTop: 24 }}>
          <Link href="/" style={{ color: "#8fbf9f", fontSize: 14, textDecoration: "none" }}>
            ← back to piyush.sh
          </Link>
        </div>
      </main>
    </div>
  );
}
