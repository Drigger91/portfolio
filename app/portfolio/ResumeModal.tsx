"use client";
import { useEffect } from "react";
import { RESUME_URL } from "./content";

const dot = { width: 12, height: 12, borderRadius: "50%", background: "#3a3d44" } as const;

export default function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Résumé preview"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background: "rgba(6,7,9,.72)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        animation: "fadein .18s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(920px, 100%)",
          height: "min(88vh, 100%)",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #24262b",
          borderRadius: 12,
          overflow: "hidden",
          background: "#0e0f12",
          boxShadow: "0 24px 60px -20px rgba(0,0,0,.7)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 12px 0 14px",
            height: 46,
            background: "#141519",
            borderBottom: "1px solid #202329",
            flexShrink: 0,
          }}
        >
          <span style={dot} />
          <span style={dot} />
          <span style={dot} />
          <span
            style={{
              flex: 1,
              fontSize: 12,
              color: "#6b7079",
              letterSpacing: ".03em",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            resume.pdf — piyush tiwari
          </span>
          <a
            href={RESUME_URL}
            download="Piyush_Tiwari_Resume.pdf"
            style={{
              background: "#8fbf9f",
              color: "#0c0d0f",
              fontWeight: 500,
              fontSize: 12.5,
              fontFamily: "'JetBrains Mono',monospace",
              padding: "6px 12px",
              borderRadius: 6,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Download ↓
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              border: "1px solid #2c2f35",
              color: "#c1c4cb",
              fontSize: 12.5,
              fontFamily: "'JetBrains Mono',monospace",
              padding: "6px 12px",
              borderRadius: 6,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Open ↗
          </a>
          <button
            onClick={onClose}
            aria-label="Close preview"
            style={{
              border: "1px solid #2c2f35",
              background: "transparent",
              color: "#9498a1",
              fontSize: 13,
              width: 30,
              height: 30,
              borderRadius: 6,
              cursor: "pointer",
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, position: "relative", background: "#0b0c0e" }}>
          <object
            data={`${RESUME_URL}#toolbar=1&view=FitH`}
            type="application/pdf"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Fallback for browsers (often mobile) that won't embed a PDF */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 14,
                padding: 24,
                textAlign: "center",
              }}
            >
              <div style={{ color: "#9498a1", fontSize: 13.5, lineHeight: 1.6 }}>
                your browser can’t preview PDFs inline.
              </div>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#8fbf9f",
                  color: "#0c0d0f",
                  fontWeight: 500,
                  fontSize: 14,
                  padding: "11px 20px",
                  borderRadius: 8,
                  textDecoration: "none",
                }}
              >
                Open résumé ↗
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}
