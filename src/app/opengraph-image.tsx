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
          background: "#0d0b09",
          color: "#efe8dc",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#9a9084" }}>
          <span>{person.role}</span>
          <span>{person.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.9 }}>
          <span style={{ fontSize: 200, fontWeight: 700, letterSpacing: -10 }}>{person.firstName}</span>
          <span style={{ fontSize: 200, fontWeight: 700, letterSpacing: -10, color: "#ffa31a", paddingLeft: 110 }}>
            {person.lastName}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(239,232,220,0.15)", paddingTop: 28 }}>
          <span style={{ fontSize: 30, maxWidth: 900, lineHeight: 1.25 }}>{hero.pitch}</span>

        </div>
      </div>
    ),
    size,
  );
}
