import { ImageResponse } from "next/og";
import { person, hero } from "@/data/content";

export const alt = `${person.fullName}, ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a09",
          color: "#f2f0ea",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8f8d86", letterSpacing: 4, textTransform: "uppercase" }}>
          <span>Portfolio — 2026</span>
          <span>{person.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
          <span style={{ fontSize: 200, fontWeight: 700, letterSpacing: -10 }}>{person.firstName}</span>
          <span style={{ fontSize: 200, fontWeight: 700, letterSpacing: -10, color: "#c8ff2e", paddingLeft: 120, fontStyle: "italic" }}>
            {person.lastName}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(242,240,234,0.15)", paddingTop: 28 }}>
          <span style={{ fontSize: 30, maxWidth: 760, lineHeight: 1.25 }}>{hero.pitch}</span>
          <span style={{ fontSize: 22, color: "#c8ff2e" }}>{"> Full-Stack Engineer"}</span>
        </div>
      </div>
    ),
    size,
  );
}
