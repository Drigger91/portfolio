"use client";
import { useCallback, useEffect, useState } from "react";
import Terminal from "./Terminal";
import Site from "./Site";
import ResumeModal from "./ResumeModal";
import type { PostMeta } from "./content";

type Mode = "terminal" | "site";
const START_MODE: Mode = "site";

const btnBase = {
  border: "none",
  fontFamily: "'JetBrains Mono',monospace",
  fontSize: "12.5px",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
} as const;
const activeBtn = { ...btnBase, background: "#22252b", color: "#e6e7ea" };
const idleBtn = { ...btnBase, background: "transparent", color: "#8b8f98" };

export default function Portfolio({ posts }: { posts: PostMeta[] }) {
  const [mode, setMode] = useState<Mode>(START_MODE);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("pt_mode");
      if (saved === "terminal" || saved === "site") setMode(saved);
    } catch (e) {
      /* storage blocked — use default */
    }
  }, []);

  const switchTo = useCallback((m: Mode) => {
    try {
      localStorage.setItem("pt_mode", m);
    } catch (e) {
      /* storage blocked — ignore */
    }
    setMode(m);
  }, []);

  const isTerminal = mode === "terminal";

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
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, letterSpacing: ".02em" }}>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#8fbf9f",
              boxShadow: "0 0 10px #8fbf9f88",
              display: "inline-block",
            }}
          />
          <span style={{ color: "#e6e7ea", fontWeight: 500 }}>piyush</span>
          <span style={{ color: "#5c616b" }}>@</span>
          <span style={{ color: "#9498a1" }}>portfolio</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", border: "1px solid #26282d", borderRadius: 8, padding: 3, background: "#111215" }}>
          <button onClick={() => switchTo("terminal")} style={isTerminal ? activeBtn : idleBtn}>
            $ terminal
          </button>
          <button onClick={() => switchTo("site")} style={isTerminal ? idleBtn : activeBtn}>
            ☰ site
          </button>
        </div>
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {isTerminal ? (
          <Terminal
            posts={posts}
            onSwitchToSite={() => switchTo("site")}
            onOpenResume={() => setResumeOpen(true)}
          />
        ) : (
          <Site
            posts={posts}
            onSwitchToTerminal={() => switchTo("terminal")}
            onOpenResume={() => setResumeOpen(true)}
          />
        )}
      </main>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
