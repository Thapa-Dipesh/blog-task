import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/db/posts";

export const runtime = "nodejs";
export const alt = "KODEX. Technical Archives";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title || "Technical Insights & Architectural Patterns";
  const author = post?.author?.name || "KODEX. Engineering";
  const keywords = post?.keywords
    ? post.keywords.split(",").map((k) => k.trim())
    : ["Engineering", "Architecture"];

  const textOnly = (post?.description || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordsCount = textOnly ? textOnly.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordsCount / 200));

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(234, 88, 12, 0.25) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(30, 41, 59, 0.5) 0%, transparent 60%)",
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Top Bar: Brand Logo & Read Time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              color: "#ffffff",
            }}
          >
            KODEX
            <span style={{ color: "#ea580c" }}>.</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: "9999px",
                backgroundColor: "rgba(234, 88, 12, 0.15)",
                border: "1px solid rgba(234, 88, 12, 0.4)",
                color: "#fb923c",
                fontSize: 18,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {readTime} MIN READ
            </div>
          </div>
        </div>

        {/* Center: Article Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "1040px",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#f8fafc",
            }}
          >
            {title}
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {keywords.slice(0, 3).map((kw) => (
              <div
                key={kw}
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#cbd5e1",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                #{kw}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Author info & site url */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "30px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "9999px",
                backgroundColor: "#ea580c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 800,
                fontSize: 22,
              }}
            >
              {author[0]?.toUpperCase() || "K"}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                {author}
              </span>
              <span
                style={{
                  fontSize: 16,
                  color: "#94a3b8",
                }}
              >
                Technical Contributor
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#ea580c",
              letterSpacing: "0.05em",
            }}
          >
            kodex.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
