import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * The mark is the mechanism: one input on the left, three payout lanes
 * fanning out to the right. Deliberately not a price chart — this project
 * does not draw prices it cannot source.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          background: "#08090a",
          border: "2px solid #16191c",
          borderRadius: 12,
        }}
      >
        <div
          style={{ display: "flex", width: 6, height: 26, background: "#e9edf0" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", width: 24, height: 5, background: "#29e07f" }} />
          <div style={{ display: "flex", width: 16, height: 5, background: "#29e07f" }} />
          <div style={{ display: "flex", width: 20, height: 5, background: "#29e07f" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
