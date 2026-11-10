import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { PageSeo } from "@/lib/seo";

export const ogSize = { width: 1200, height: 630 };
/** Formato quadrato, usato dall'anteprima della home. */
export const ogSquare = { width: 1200, height: 1200 };

/** L'immagine che compare quando si condivide un link: sfondo scuro, titolo grande nel colore dell'area. */
export async function renderOg(p: PageSeo, size: { width: number; height: number } = ogSize) {
  const square = size.height === size.width;
  const [anton, grotesk] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Anton-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/SpaceGrotesk-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: square ? "88px 80px" : "64px 72px",
          background: `radial-gradient(900px 520px at 88% 0%, ${p.accent}33, transparent 60%), #08080a`,
          color: "#f3f3ec",
          fontFamily: "Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", fontFamily: "Anton", fontSize: 54, lineHeight: 1 }}>FC</div>
          <div style={{ display: "flex", width: 14, height: 14, borderRadius: 14, background: p.accent }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {!square && (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: p.accent,
              }}
            >
              {p.eyebrow}
            </div>
          )}
          <div
            style={{
              display: "flex",
              marginTop: square ? 0 : 18,
              fontFamily: "Anton",
              flexDirection: "column",
              fontSize: square ? 150 : p.roles ? 108 : p.card.length > 14 ? 128 : p.card.length > 9 ? 150 : 190,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            {(square ? p.card.split(" ") : [p.card]).map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
          {p.roles && (
            <div style={{ display: "flex", flexDirection: "column", marginTop: square ? 36 : 30, gap: square ? 12 : 10, fontSize: square ? 42 : 36 }}>
              {p.roles.map((r) => (
                <div key={r} style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ display: "flex", width: 14, height: 14, borderRadius: 14, background: p.accent }} />
                  <div style={{ display: "flex" }}>{r}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28, color: "#8a8a99" }}>
          <div style={{ display: "flex" }}>
            {square ? `${p.eyebrow} · Milano` : p.roles ? "Milano" : "Francesco Caro · Milano"}
          </div>
          <div style={{ display: "flex", width: 220, height: 6, background: p.accent }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        { name: "Grotesk", data: grotesk, style: "normal", weight: 500 },
      ],
    },
  );
}
