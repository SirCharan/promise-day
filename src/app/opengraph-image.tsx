import { ImageResponse } from "next/og";

export const alt = "Promise Day — Our promises, one room.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFF8E7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              color: "#7986CB",
              textShadow: "3px 3px 0 #4A3B2C",
              transform: "rotate(-3deg)",
            }}
          >
            Promise Day ✨
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#EC407A",
              fontWeight: 700,
            }}
          >
            Our promises, one room.
          </div>
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 24,
            }}
          >
            <span style={{ fontSize: 48 }}>💕</span>
            <span style={{ fontSize: 48 }}>🤞</span>
            <span style={{ fontSize: 48 }}>💙</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
