import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.title;
  const heroImage = searchParams.get("heroImage");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#0c0f16",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "80px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#5aa2f5",
              fontFamily: "monospace",
            }}
          >
            michalwojdylak.com
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              color: "#e6e9ef",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#9aa3b2",
            }}
          >
            {siteConfig.name} · {siteConfig.role}
          </div>
        </div>
        {heroImage && (
          <img
            src={heroImage}
            alt=""
            width={420}
            height={630}
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

