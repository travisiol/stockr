import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
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
          justifyContent: "space-between",
          backgroundColor: "#08090a",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(41,224,127,0.14), transparent 55%)",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", width: 8, height: 34, background: "#e9edf0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ display: "flex", width: 32, height: 6, background: "#29e07f" }} />
            <div style={{ display: "flex", width: 21, height: 6, background: "#29e07f" }} />
            <div style={{ display: "flex", width: 27, height: 6, background: "#29e07f" }} />
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 10,
              fontSize: 22,
              letterSpacing: 6,
              color: "rgba(233,237,240,0.45)",
            }}
          >
            ROBINHOOD CHAIN · PRE-LAUNCH
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 176,
              fontWeight: 700,
              letterSpacing: -6,
              color: "#e9edf0",
              lineHeight: 1,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 40,
              letterSpacing: 2,
              color: "#29e07f",
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 3,
            color: "rgba(233,237,240,0.42)",
          }}
        >
          <div style={{ display: "flex" }}>SPY · NVDA · BASKET</div>
          <div style={{ display: "flex" }}>0 BRIDGES</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
