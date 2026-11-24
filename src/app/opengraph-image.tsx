import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { person, hero } from "@/data/content";

export const alt = `${person.fullName}, ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Archivo (SIL Open Font License), the site's typeface, as static cuts for Satori.
const font = (file: string) => readFile(join(process.cwd(), "src/app/fonts", file));

export default async function OG() {
  const [display, text] = await Promise.all([font("archivo-display.ttf"), font("archivo-text.ttf")]);
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
          backgroundImage: "radial-gradient(circle at 22% 45%, rgba(255,163,26,0.16), transparent 55%)",
          color: "#efe8dc",
          padding: "60px 72px",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9a9084" }}>
          <span>{person.role}</span>
          <span>{person.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Archivo Display", lineHeight: 0.86, letterSpacing: -8 }}>
          <span style={{ fontSize: 190 }}>{person.firstName}</span>
          <span style={{ fontSize: 190, paddingLeft: 105 }}>{person.lastName}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22, borderTop: "1px solid rgba(239,232,220,0.15)", paddingTop: 26 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#ffa31a", flexShrink: 0 }} />
          <span style={{ fontSize: 30, lineHeight: 1.25 }}>{hero.pitch}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: text, weight: 400, style: "normal" },
        { name: "Archivo Display", data: display, weight: 800, style: "normal" },
      ],
    },
  );
}
