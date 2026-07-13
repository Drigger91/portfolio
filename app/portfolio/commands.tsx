import { ReactNode } from "react";
import { JOBS, PROJECTS, POSTS, STACK, LINKS, RESUME_URL } from "./content";

export const C = {
  green: "#8fbf9f",
  text: "#e6e7ea",
  muted: "#9498a1",
  faint: "#5c616b",
  dim: "#6b7079",
  warn: "#c9a26b",
  answer: "#c1c4cb",
};

export function line(txt: string, color?: string): ReactNode {
  return (
    <div
      style={{
        color: color || C.muted,
        whiteSpace: "pre-wrap",
        fontFamily: "'JetBrains Mono',monospace",
      }}
    >
      {txt}
    </div>
  );
}

export function helpNode(): ReactNode {
  const rows: [string, string][] = [
    ["about", "who is this guy"],
    ["career", "where he’s worked"],
    ["projects", "things he built"],
    ["writing", "half-finished blog posts"],
    ["stack", "tools of the trade"],
    ["contact", "how to reach him"],
    ["resume", "download the pdf"],
    ["chess", "♙"],
    ["site", "switch to the classic site"],
    ["clear", "wipe the screen"],
  ];
  return (
    <div style={{ lineHeight: 1.7 }}>
      <div style={{ color: C.muted, marginBottom: 6 }}>available commands:</div>
      <div style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "2px 12px" }}>
        {rows.map(([c, d]) => (
          <span key={c} style={{ display: "contents" }}>
            <span style={{ color: C.green }}>{c}</span>
            <span style={{ color: C.dim }}>{d}</span>
          </span>
        ))}
      </div>
      <div style={{ color: C.faint, marginTop: 10 }}>
        …or just ask a question in plain english — like “why should I hire you?”
      </div>
    </div>
  );
}

export function aboutNode(): ReactNode {
  return (
    <div style={{ lineHeight: 1.65 }}>
      {line("Piyush Tiwari — Senior Software Development Engineer @ Razorpay, Bangalore.", C.text)}
      {line(
        "Backend engineer. I like event-driven systems, uncomfortably high uptime numbers, and turning 1200 policies/hr into 5000+.",
        C.muted
      )}
      {line("B.Tech ECE (RGPV). Off the clock: chess, competitive programming, and side projects.", C.muted)}
    </div>
  );
}

export function careerNode(): ReactNode {
  return (
    <div style={{ lineHeight: 1.6 }}>
      {JOBS.map((j, i) => (
        <div key={i} style={{ marginBottom: i < JOBS.length - 1 ? 14 : 0 }}>
          <div>
            <span style={{ color: C.text, fontWeight: 500 }}>{j.role}</span>
            <span style={{ color: C.faint }}>{"  " + j.period}</span>
          </div>
          <div style={{ color: C.green, fontSize: "12.5px" }}>
            {j.company + " · " + j.location}
          </div>
          <ul style={{ margin: "6px 0 0", paddingLeft: 18, color: C.muted }}>
            {j.points.map((p, k) => (
              <li key={k} style={{ marginBottom: 3 }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function projectsNode(): ReactNode {
  return (
    <div style={{ lineHeight: 1.6 }}>
      {PROJECTS.map((p, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div>
            <span style={{ color: C.green }}>▸ </span>
            <span style={{ color: C.text, fontWeight: 500 }}>{p.name}</span>
          </div>
          <div style={{ color: C.muted, paddingLeft: 16 }}>{p.desc}</div>
          <div style={{ paddingLeft: 16 }}>
            <span style={{ color: C.faint }}>{p.stack + "  ·  "}</span>
            <a href={p.url} target="_blank" rel="noreferrer">
              repo ↗
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export function writingNode(): ReactNode {
  return (
    <div style={{ lineHeight: 1.6 }}>
      {line("drafts in progress — poke me and I’ll ship them faster:", C.faint)}
      {POSTS.map((p, i) => (
        <div key={i} style={{ marginTop: 6 }}>
          <span style={{ color: C.green }}>• </span>
          <span style={{ color: C.text }}>{p.title}</span>
          <span style={{ color: C.faint }}>{"  [" + p.status + "]"}</span>
        </div>
      ))}
    </div>
  );
}

export function stackNode(): ReactNode {
  return (
    <div style={{ lineHeight: 1.7 }}>
      {STACK.map((grp, i) => (
        <div key={i}>
          <span style={{ color: C.green, display: "inline-block", width: 110 }}>{grp.label}</span>
          <span style={{ color: C.muted }}>{grp.items.join(" · ")}</span>
        </div>
      ))}
    </div>
  );
}

export function contactNode(): ReactNode {
  return (
    <div style={{ lineHeight: 1.7 }}>
      {LINKS.map((l) => (
        <div key={l.label}>
          <span style={{ color: C.faint, display: "inline-block", width: 90 }}>
            {l.label.toLowerCase()}
          </span>
          <a href={l.url} target="_blank" rel="noreferrer">
            {l.handle}
          </a>
        </div>
      ))}
    </div>
  );
}

export function resumeNode(): ReactNode {
  return (
    <div>
      {line("opening résumé preview… ", C.green)}
      <div>
        <a href={RESUME_URL} target="_blank" rel="noreferrer">
          or open the pdf directly ↗
        </a>
      </div>
    </div>
  );
}

export function chessNode(): ReactNode {
  return (
    <div>
      <pre style={{ margin: 0, color: C.muted, fontSize: "13px", lineHeight: 1.4 }}>
        {"  ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜\n  ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟"}
      </pre>
      {line("1. e4 — your move. also: LeetCode Piyush077 if you'd rather race on algorithms.", C.faint)}
    </div>
  );
}
