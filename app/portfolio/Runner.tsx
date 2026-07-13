"use client";
import { useEffect, useRef } from "react";

const GREEN = "#8fbf9f";
const EYE = "#0b0c0e";

// Pixel creature drawn with box-shadow on a 5px grid (two dark eye pixels).
const PIXEL_SHADOW = [
  "5px 0", "10px 0", "15px 0",
  "0 5px", "5px 5px", "10px 5px", "15px 5px", "20px 5px",
  "0 10px", "10px 10px", "20px 10px",
  "0 15px", "5px 15px", "10px 15px", "15px 15px", "20px 15px",
  "5px 20px", "15px 20px",
]
  .map((p) => `${p} 0 0 ${GREEN}`)
  .concat([`5px 10px 0 0 ${EYE}`, `15px 10px 0 0 ${EYE}`])
  .join(",");

type Props = {
  soundOn: boolean;
  toggleSound: () => void;
  onHop: () => void;
};

export default function Runner({ soundOn, toggleSound, onHop }: Props) {
  const hopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = hopRef.current;
    if (!el) return;
    const handler = () => onHop();
    el.addEventListener("animationiteration", handler);
    return () => el.removeEventListener("animationiteration", handler);
  }, [onHop]);

  return (
    <div
      style={{
        position: "relative",
        height: 84,
        borderBottom: "1px solid #202329",
        background: "#0b0c0e",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 16,
          right: 16,
          bottom: 16,
          height: 1,
          background:
            "repeating-linear-gradient(90deg,#2a2d33 0,#2a2d33 6px,transparent 6px,transparent 12px)",
        }}
      />
      <button
        onClick={toggleSound}
        style={{
          position: "absolute",
          right: 12,
          top: 8,
          fontSize: "10.5px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'JetBrains Mono',monospace",
          color: soundOn ? GREEN : "#3a3d44",
          padding: 0,
        }}
      >
        {soundOn ? "♪ music: on" : "♪ music: off"}
      </button>
      <span
        style={{ position: "absolute", bottom: 17, left: "38%", width: 9, height: 19, background: "#20242a", borderRadius: 1 }}
      />
      <span
        style={{ position: "absolute", bottom: 17, left: "72%", width: 9, height: 28, background: "#20242a", borderRadius: 1 }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 17,
          left: -32,
          animation: "runacross 6.5s linear infinite",
        }}
      >
        <div
          ref={hopRef}
          style={{
            animation: "hop 1.15s ease-in-out infinite",
            transformOrigin: "bottom center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 5,
              height: 5,
              background: "transparent",
              boxShadow: PIXEL_SHADOW,
            }}
          />
        </div>
        <div
          style={{
            width: 25,
            height: 5,
            marginTop: 4,
            borderRadius: "50%",
            background: GREEN,
            animation: "shadowpulse 1.15s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
