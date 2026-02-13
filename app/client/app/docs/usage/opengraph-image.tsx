import { ImageResponse } from "next/og";

export const alt = "CLI Usage - mkcmd Documentation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#fcfcfc",
          color: "#3d5afe",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "4px solid #3d5afe",
            padding: "40px 80px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -20,
              left: 20,
              fontSize: 20,
              color: "#8c9eff",
            }}
          >
            DOCUMENTATION
          </div>
          <div style={{ fontSize: 72, fontWeight: "bold", letterSpacing: 8 }}>
            CLI USAGE
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#8c9eff",
              marginTop: 16,
              letterSpacing: 2,
            }}
          >
            bunx @mbsi/mkcmd init
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
