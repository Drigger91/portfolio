"use client";
import Link from "next/link";
import { HERO, SUMMARY, JOBS, PROJECTS, STACK, LINKS } from "./content";
import type { PostMeta } from "./content";

const MAXW = { maxWidth: 1000, margin: "0 auto" } as const;
const eyebrow = { fontSize: 12, color: "#5c616b", letterSpacing: ".12em" } as const;
const divider = "1px solid #17191d";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Format from the ISO string directly (no Date()) to avoid timezone/hydration drift.
function fmtDate(iso: string): string {
  const [y, m] = iso.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : "";
}
const isReadable = (p: PostMeta) => p.status === "published" && p.hasContent && !p.external;

type Props = {
  posts: PostMeta[];
  onSwitchToTerminal: () => void;
  onOpenResume: () => void;
};

export default function Site({ posts, onSwitchToTerminal, onOpenResume }: Props) {
  return (
    <div style={{ width: "100%" }}>
      {/* Hero */}
      <section style={{ ...MAXW, padding: "72px 24px 56px" }}>
        <div style={{ fontSize: 13, color: "#8fbf9f", marginBottom: 20, letterSpacing: ".04em" }}>
          {HERO.eyebrow}
        </div>
        <h1
          style={{
            fontSize: "clamp(38px,7vw,72px)",
            lineHeight: 1.02,
            margin: "0 0 22px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#f2f3f5",
          }}
        >
          {HERO.name}
        </h1>
        <p
          style={{
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontSize: "clamp(17px,2.4vw,21px)",
            lineHeight: 1.55,
            color: "#b3b7bf",
            maxWidth: 640,
            margin: "0 0 32px",
          }}
        >
          {HERO.intro}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <button
            onClick={onOpenResume}
            style={{
              background: "#8fbf9f",
              color: "#0c0d0f",
              fontWeight: 500,
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 14,
              padding: "11px 20px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            View resume ↗
          </button>
          <a
            href="#contact"
            style={{
              border: "1px solid #2c2f35",
              color: "#e6e7ea",
              fontSize: 14,
              padding: "11px 20px",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Get in touch
          </a>
          <button
            onClick={onSwitchToTerminal}
            style={{
              background: "transparent",
              border: "1px solid #2c2f35",
              color: "#9498a1",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 14,
              padding: "11px 20px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            $ prefer a terminal? →
          </button>
        </div>

        <div
          style={{
            marginTop: 44,
            border: "1px solid #22242a",
            borderRadius: 10,
            overflow: "hidden",
            background: "#0e0f12",
            maxWidth: 560,
          }}
        >
          <div style={{ display: "flex", gap: 7, padding: "10px 14px", background: "#141519", borderBottom: "1px solid #202329" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3d44" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3d44" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#3a3d44" }} />
          </div>
          <pre style={{ margin: 0, padding: 16, fontSize: "12.5px", lineHeight: 1.7, color: "#9498a1", overflowX: "auto" }}>
            <span style={{ color: "#8fbf9f" }}>➜</span> whoami{"\n"}
            <span style={{ color: "#e6e7ea" }}>piyush</span> — Senior SDE @ Razorpay{"\n"}
            <span style={{ color: "#8fbf9f" }}>➜</span> cat stack.txt{"\n"}
            Golang · Spring Boot · NestJS · TypeScript{"\n"}
            PostgreSQL · MongoDB · Redis · Kubernetes · gRPC{"\n"}
            <span style={{ color: "#8fbf9f" }}>➜</span> uptime{"\n"}
            99.99% <span style={{ color: "#5c616b" }}># and counting</span>
          </pre>
        </div>
      </section>

      {/* Summary */}
      <section style={{ ...MAXW, padding: "24px 24px 56px", borderTop: divider }}>
        <div style={{ ...eyebrow, marginBottom: 18 }}>01 — SUMMARY</div>
        <p
          style={{
            fontFamily: "'IBM Plex Sans',sans-serif",
            fontSize: "clamp(18px,2.6vw,26px)",
            lineHeight: 1.5,
            color: "#cdd0d6",
            maxWidth: 760,
            margin: 0,
          }}
        >
          {SUMMARY}
        </p>
      </section>

      {/* Career */}
      <section style={{ ...MAXW, padding: "24px 24px 56px", borderTop: divider }}>
        <div style={{ ...eyebrow, marginBottom: 28 }}>02 — CAREER</div>
        {JOBS.map((job, i) => (
          <div
            key={i}
            className="career-row"
            style={{ gap: 24, paddingBottom: 32, marginBottom: 32, borderBottom: divider }}
          >
            <div>
              <div style={{ fontSize: "12.5px", color: "#8fbf9f" }}>{job.period}</div>
              <div style={{ fontSize: 13, color: "#6b7079", marginTop: 6 }}>
                {job.company} · {job.location}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 19, margin: "0 0 4px", color: "#f2f3f5", fontWeight: 500 }}>
                {job.role}
              </h3>
              <ul
                style={{
                  fontFamily: "'IBM Plex Sans',sans-serif",
                  margin: "12px 0 14px",
                  paddingLeft: 18,
                  color: "#aeb2ba",
                  fontSize: 15,
                  lineHeight: 1.6,
                }}
              >
                {job.points.map((pt, k) => (
                  <li key={k} style={{ marginBottom: 8 }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section style={{ ...MAXW, padding: "24px 24px 56px", borderTop: divider }}>
        <div style={{ ...eyebrow, marginBottom: 28 }}>03 — PROJECTS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="proj-card"
              style={{
                display: "block",
                border: "1px solid #22242a",
                borderRadius: 10,
                padding: 20,
                background: "#0f1013",
                textDecoration: "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 12, color: "#5c616b" }}>{p.kind}</span>
                <span style={{ color: "#8fbf9f", fontSize: 13 }}>↗</span>
              </div>
              <h3 style={{ fontSize: 17, margin: "0 0 8px", color: "#f2f3f5", fontWeight: 500 }}>{p.name}</h3>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans',sans-serif",
                  fontSize: 14,
                  color: "#9498a1",
                  margin: "0 0 14px",
                  lineHeight: 1.5,
                }}
              >
                {p.desc}
              </p>
              <div style={{ fontSize: "11.5px", color: "#6b7079" }}>{p.stack}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Writing */}
      {posts.length > 0 && (
        <section style={{ ...MAXW, padding: "24px 24px 56px", borderTop: divider }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            <div style={eyebrow}>04 — WRITING</div>
            <div style={{ fontSize: 12, color: "#6b7079", fontFamily: "'IBM Plex Sans',sans-serif" }}>
              notes on systems i’ve broken &amp; fixed
            </div>
          </div>
          {posts.map((post) => {
            const clickable = isReadable(post) || !!post.external;
            const rowStyle = {
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 16,
              padding: "18px 0",
              borderBottom: divider,
              textDecoration: "none",
              color: "inherit",
            } as const;
            const inner = (
              <>
                <div>
                  <h3 style={{ fontSize: "16.5px", margin: "0 0 5px", color: "#e6e7ea", fontWeight: 500 }}>
                    {post.title}
                    {clickable && <span style={{ color: "#8fbf9f", fontSize: 13, marginLeft: 8 }}>↗</span>}
                  </h3>
                  <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 14, color: "#9498a1", margin: 0, lineHeight: 1.5 }}>
                    {post.blurb}
                  </p>
                  {post.date && <div style={{ fontSize: 12, color: "#5c616b", marginTop: 6 }}>{fmtDate(post.date)}</div>}
                </div>
                <span style={{ fontSize: 11, color: "#6b7079", border: "1px solid #26282d", padding: "2px 8px", borderRadius: 5, whiteSpace: "nowrap" }}>
                  {post.external ? "link" : post.status}
                </span>
              </>
            );
            if (post.external) {
              return (
                <a key={post.slug} href={post.external} target="_blank" rel="noreferrer" className="writing-row" style={rowStyle}>
                  {inner}
                </a>
              );
            }
            if (isReadable(post)) {
              return (
                <Link key={post.slug} href={`/writing/${post.slug}`} className="writing-row" style={rowStyle}>
                  {inner}
                </Link>
              );
            }
            return (
              <div key={post.slug} style={rowStyle}>
                {inner}
              </div>
            );
          })}
        </section>
      )}

      {/* Stack */}
      <section style={{ ...MAXW, padding: "24px 24px 56px", borderTop: divider }}>
        <div style={{ ...eyebrow, marginBottom: 28 }}>05 — STACK</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 28 }}>
          {STACK.map((grp, i) => (
            <div key={i}>
              <div style={{ fontSize: "12.5px", color: "#8fbf9f", marginBottom: 12 }}>{grp.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {grp.items.map((it) => (
                  <span
                    key={it}
                    style={{
                      fontSize: "12.5px",
                      color: "#c1c4cb",
                      border: "1px solid #26282d",
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "#111215",
                    }}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ ...MAXW, padding: "56px 24px 40px", borderTop: divider }}>
        <div style={{ ...eyebrow, marginBottom: 20 }}>06 — CONTACT</div>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", margin: "0 0 16px", color: "#f2f3f5", fontWeight: 700, letterSpacing: "-0.01em" }}>
          Say hello 👋
        </h2>
        <p style={{ fontFamily: "'IBM Plex Sans',sans-serif", fontSize: 17, color: "#aeb2ba", maxWidth: 560, margin: "0 0 28px", lineHeight: 1.55 }}>
          Inbox is always open — question, opportunity, or just to argue about the Sicilian Defense. I’ll get back to you.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.url}
              target={l.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              style={{ border: "1px solid #2c2f35", color: "#e6e7ea", fontSize: 14, padding: "11px 18px", borderRadius: 8, textDecoration: "none" }}
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </section>

      <footer style={{ ...MAXW, padding: 24, borderTop: divider, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, fontSize: 12, color: "#5c616b" }}>
        <span>built with too much coffee ☕ · bangalore, in</span>
        <span>© 2026 piyush tiwari</span>
      </footer>
    </div>
  );
}
