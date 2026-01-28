import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/server/db";
import { UI_TEXT } from "@/constants/uiText";

function formatDateTimeJa(date: Date) {
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DecisionResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const log = await prisma.decisionLog.findUnique({
    where: { id },
    select: {
      id: true,
      createdAt: true,
      result: true,
      holdUntil: true,
    },
  });

  if (!log) return notFound();

  const now = new Date();
  const expired =
    log.holdUntil != null && now.getTime() > new Date(log.holdUntil).getTime();

  // 結果ごとの色
  const resultColors = {
    EXIT: "#dc2626",
    HOLD: "#f59e0b",
    PROCEEDABLE: "#16a34a",
  };

  const resultColor = resultColors[log.result];

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>{UI_TEXT.pages.result.title}</h1>

      {/* 判定結果 */}
      <section
        style={{
          marginTop: 24,
          padding: 24,
          border: `3px solid ${resultColor}`,
          borderRadius: 12,
          backgroundColor: `${resultColor}10`,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: resultColor,
              marginBottom: 16,
            }}
          >
            {UI_TEXT.pages.result[log.result].heading}
          </div>
          <p style={{ fontSize: 18, lineHeight: 1.6 }}>
            {UI_TEXT.pages.result[log.result].description}
          </p>
        </div>

        {/* HOLD期限表示 */}
        {log.result === "HOLD" && log.holdUntil && (
          <div
            style={{
              marginTop: 24,
              padding: 16,
              backgroundColor: "white",
              borderRadius: 8,
              border: "1px solid #ddd",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 8 }}>
              {UI_TEXT.pages.result.HOLD.holdUntilLabel}
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: resultColor }}>
              {formatDateTimeJa(new Date(log.holdUntil))}
              {expired && (
                <span style={{ marginLeft: 12, fontSize: 16, color: "#dc2626" }}>
                  （{UI_TEXT.pages.result.HOLD.expiredBadge}）
                </span>
              )}
            </div>
            {expired && (
              <p style={{ marginTop: 12, color: "#dc2626", fontWeight: 600 }}>
                {UI_TEXT.pages.result.HOLD.expiredMessage}
              </p>
            )}
          </div>
        )}

        {/* 判定日時 */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid #ddd",
            fontSize: 14,
            color: "#666",
          }}
        >
          {UI_TEXT.pages.result.createdAtLabel}：
          {formatDateTimeJa(new Date(log.createdAt))}
        </div>
      </section>

      {/* アクションボタン */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <Link
          href={`/decision/logs/${log.id}`}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2563eb",
            color: "white",
            borderRadius: 8,
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          {UI_TEXT.pages.result.actions.viewDetail}
        </Link>
        <Link
          href="/decision/new"
          style={{
            padding: "12px 24px",
            backgroundColor: "white",
            color: "#2563eb",
            border: "2px solid #2563eb",
            borderRadius: 8,
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          {UI_TEXT.pages.result.actions.newDecision}
        </Link>
        <Link
          href="/decision/logs"
          style={{
            padding: "12px 24px",
            backgroundColor: "white",
            color: "#666",
            border: "1px solid #ddd",
            borderRadius: 8,
            fontWeight: 700,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          {UI_TEXT.pages.result.actions.viewLogs}
        </Link>
      </div>
    </main>
  );
}