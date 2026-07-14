"use client";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Runner from "./Runner";
import { useSound } from "./useSound";
import { WHACKY } from "./content";
import type { PostMeta } from "./content";
import {
  C,
  line,
  helpNode,
  aboutNode,
  careerNode,
  projectsNode,
  writingNode,
  stackNode,
  contactNode,
  resumeNode,
  chessNode,
} from "./commands";

type EntryData =
  | { kind: "cmd"; text: string }
  | { kind: "loading" }
  | { kind: "node"; node: ReactNode };
type Entry = EntryData & { id: number };

type Props = {
  posts: PostMeta[];
  onSwitchToSite: () => void;
  onOpenResume: () => void;
};

export default function Terminal({ posts, onSwitchToSite, onOpenResume }: Props) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const keyRef = useRef(0);
  const cmdHist = useRef<string[]>([]);
  const histIdx = useRef(-1);

  const { soundOn, toggleSound, playBlip } = useSound();

  const nextKey = () => (keyRef.current += 1);
  const focusInput = useCallback(() => inputRef.current?.focus(), []);

  const push = useCallback((entry: EntryData) => {
    setHistory((h) => [...h, { id: nextKey(), ...entry } as Entry]);
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, busy]);

  useEffect(() => {
    const t = setTimeout(focusInput, 60);
    return () => clearTimeout(t);
  }, [focusInput]);

  const ask = useCallback(
    async (raw: string) => {
      setBusy(true);
      const loadingId = nextKey();
      setHistory((h) => [...h, { id: loadingId, kind: "loading" }]);
      let answer: string;
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: raw }),
        });
        const data = await res.json();
        if (data.offtopic) {
          answer = WHACKY[Math.floor(Math.random() * WHACKY.length)];
        } else {
          answer = data.answer || "hmm, i drew a blank. try `help` for the scripted stuff.";
        }
      } catch (err) {
        answer = "hmm, my brain (the API) timed out. try again, or run `help` for the scripted stuff.";
      }
      setHistory((h) =>
        h.map((e) =>
          e.id === loadingId
            ? {
                id: e.id,
                kind: "node",
                node: (
                  <div style={{ color: C.answer, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                    {answer}
                  </div>
                ),
              }
            : e
        )
      );
      setBusy(false);
    },
    []
  );

  const run = useCallback(
    (raw: string) => {
      if (raw !== "") push({ kind: "cmd", text: raw });
      if (raw === "") return;
      const cmd = raw.toLowerCase().split(/\s+/)[0];
      const outputs: Record<string, () => void> = {
        help: () => push({ kind: "node", node: helpNode() }),
        "?": () => push({ kind: "node", node: helpNode() }),
        about: () => push({ kind: "node", node: aboutNode() }),
        whoami: () => push({ kind: "node", node: aboutNode() }),
        summary: () => push({ kind: "node", node: aboutNode() }),
        career: () => push({ kind: "node", node: careerNode() }),
        experience: () => push({ kind: "node", node: careerNode() }),
        work: () => push({ kind: "node", node: careerNode() }),
        projects: () => push({ kind: "node", node: projectsNode() }),
        ls: () => push({ kind: "node", node: projectsNode() }),
        writing: () => push({ kind: "node", node: writingNode(posts) }),
        blog: () => push({ kind: "node", node: writingNode(posts) }),
        skills: () => push({ kind: "node", node: stackNode() }),
        stack: () => push({ kind: "node", node: stackNode() }),
        contact: () => push({ kind: "node", node: contactNode() }),
        links: () => push({ kind: "node", node: contactNode() }),
        resume: () => {
          push({ kind: "node", node: resumeNode() });
          onOpenResume();
        },
        cv: () => outputs.resume(),
        chess: () => push({ kind: "node", node: chessNode() }),
        site: () => {
          push({ kind: "node", node: line("opening classic site…", C.green) });
          setTimeout(onSwitchToSite, 350);
        },
        clear: () => setHistory([]),
        cls: () => setHistory([]),
      };
      if (outputs[cmd]) {
        outputs[cmd]();
        return;
      }
      ask(raw);
    },
    [push, ask, onSwitchToSite, onOpenResume, posts]
  );

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const raw = input.trim();
      setInput("");
      if (raw) {
        cmdHist.current.push(raw);
        histIdx.current = cmdHist.current.length;
      }
      run(raw);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHist.current.length && histIdx.current > 0) {
        histIdx.current -= 1;
        setInput(cmdHist.current[histIdx.current]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current < cmdHist.current.length - 1) {
        histIdx.current += 1;
        setInput(cmdHist.current[histIdx.current]);
      } else {
        histIdx.current = cmdHist.current.length;
        setInput("");
      }
    }
  };

  const chips: [string, string][] = [
    ["help", "help"],
    ["career", "career"],
    ["projects", "projects"],
    ["why hire you?", "why should I hire you?"],
    ["resume", "resume"],
  ];

  return (
    <div style={{ width: "100%", maxWidth: 1000, margin: "0 auto", padding: "28px 20px 40px" }}>
      <div
        style={{
          border: "1px solid #24262b",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 24px 60px -20px rgba(0,0,0,.7)",
          background: "#0e0f12",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            height: 42,
            background: "#141519",
            borderBottom: "1px solid #202329",
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#3a3d44" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#3a3d44" }} />
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#3a3d44" }} />
          <span style={{ flex: 1, textAlign: "center", fontSize: 12, color: "#6b7079", letterSpacing: ".03em" }}>
            piyush@portfolio — zsh — 100×32
          </span>
        </div>

        <Runner soundOn={soundOn} toggleSound={toggleSound} onHop={playBlip} />

        <div
          ref={logRef}
          onClick={focusInput}
          className="scroll-hide"
          style={{
            padding: "20px 20px 16px",
            height: "min(60vh,560px)",
            overflowY: "auto",
            fontSize: "13.5px",
            lineHeight: 1.65,
            cursor: "text",
          }}
        >
          <div style={{ marginBottom: 6 }}>
            <div style={{ color: "#f2f3f5", fontSize: "17px", fontWeight: 700, letterSpacing: "0.04em" }}>
              piyush<span style={{ color: C.green }}>.sh</span>
            </div>
          </div>

          {history.map((e) => {
            if (e.kind === "cmd") {
              return (
                <div key={e.id} className="tlog-enter" style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <span style={{ color: C.green, fontWeight: 500 }}>➜</span>
                  <span style={{ color: C.faint }}>~</span>
                  <span style={{ color: C.text }}>{e.text}</span>
                </div>
              );
            }
            if (e.kind === "loading") {
              return (
                <div key={e.id} style={{ display: "flex", gap: 6, marginTop: 8, alignItems: "center", color: C.faint }}>
                  <span>thinking</span>
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#8fbf9f",
                        display: "inline-block",
                        animation: `dotpulse 1.1s ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div key={e.id} className="tlog-enter" style={{ marginTop: 6, marginBottom: 2 }}>
                {e.node}
              </div>
            );
          })}

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
            <span style={{ color: C.green, fontWeight: 500 }}>➜</span>
            <span style={{ color: C.faint }}>~</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              ref={inputRef}
              spellCheck={false}
              autoComplete="off"
              placeholder="type a command or ask a question…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e6e7ea",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "13.5px",
                caretColor: "#8fbf9f",
                padding: 0,
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
        <span style={{ fontSize: 12, color: "#5c616b", marginRight: 4 }}>try:</span>
        {chips.map(([label, q]) => (
          <button
            key={label}
            className="chip"
            onClick={() => {
              run(q);
              focusInput();
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
