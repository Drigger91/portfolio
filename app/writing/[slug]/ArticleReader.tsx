"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js/lib/common";

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function CodeBlock({ lang, text }: { lang?: string; text: string }) {
  const html = useMemo(() => {
    try {
      if (lang && hljs.getLanguage(lang)) return hljs.highlight(text, { language: lang }).value;
      return hljs.highlightAuto(text).value;
    } catch {
      return escapeHtml(text);
    }
  }, [lang, text]);
  return (
    <pre className="code-block">
      <code className="hljs" dangerouslySetInnerHTML={{ __html: html }} />
    </pre>
  );
}

function Mermaid({ chart }: { chart: string }) {
  const id = "mm-" + useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string>("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          fontFamily: "'JetBrains Mono', monospace",
          themeVariables: {
            background: "#0e0f12",
            primaryColor: "#141519",
            primaryBorderColor: "#8fbf9f",
            primaryTextColor: "#e6e7ea",
            lineColor: "#5c616b",
            secondaryColor: "#111215",
            tertiaryColor: "#0b0c0e",
          },
        });
        const out = await mermaid.render(id, chart);
        if (active) setSvg(out.svg);
      } catch {
        if (active) setFailed(true);
      }
    })();
    return () => {
      active = false;
    };
  }, [id, chart]);

  if (failed) return <CodeBlock lang="mermaid" text={chart} />;
  if (!svg) return <div className="mermaid-loading">rendering diagram…</div>;
  return <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />;
}

export default function ArticleReader({ markdown }: { markdown: string }) {
  return (
    <div className="article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children }) {
            const text = String(children).replace(/\n$/, "");
            const lang = /language-(\w+)/.exec(className || "")?.[1];
            if (!inline && lang === "mermaid") return <Mermaid chart={text} />;
            if (inline) return <code className="inline-code">{children}</code>;
            return <CodeBlock lang={lang} text={text} />;
          },
          a({ href, children }) {
            const external = href?.startsWith("http");
            return (
              <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
