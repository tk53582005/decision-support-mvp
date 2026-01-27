import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/server/db";
import { UI_TEXT } from "@/constants/uiText";
import { QUESTIONS, Answers, QuestionId, TriState } from "@/domain/types";

function formatDateTimeJa(date: Date) {
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function triStateLabel(value: TriState) {
  return UI_TEXT.triState[value];
}

function isAnswersShape(obj: unknown): obj is Answers {
  if (typeof obj !== "object" || obj === null) return false;
  const rec = obj as Record<string, unknown>;
  const keys: QuestionId[] = ["Q1", "Q2", "Q3", "Q4", "Q5"];
  for (const k of keys) {
    const v = rec[k];
    if (v !== "YES" && v !== "NO" && v !== "UNKNOWN") return false;
  }
  return true;
}

export default async function DecisionLogDetailPage({
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
      answersJson: true,
    },
  });

  if (!log) return notFound();

  const answersJson = log.answersJson as unknown;
  if (!isAnswersShape(answersJson)) return notFound();

  const now = new Date();
  const expired =
    log.holdUntil != null && now.getTime() > new Date(log.holdUntil).getTime();

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>{UI_TEXT.pages.logDetail.title}</h1>
      <p style={{ marginTop: 8 }}>{UI_TEXT.pages.logDetail.description}</p>

      <section style={{ marginTop: 16 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <div>
            <span style={{ fontWeight: 700 }}>{UI_TEXT.pages.logDetail.fields.createdAt}：</span>
            {formatDateTimeJa(new Date(log.createdAt))}
          </div>

          <div>
            <span style={{ fontWeight: 700 }}>{UI_TEXT.pages.logDetail.fields.result}：</span>
            <span style={{ fontWeight: 800 }}>{log.result}</span>
          </div>

          <div>
            <span style={{ fontWeight: 700 }}>{UI_TEXT.pages.logDetail.fields.holdUntil}：</span>
            {log.holdUntil ? formatDateTimeJa(new Date(log.holdUntil)) : "-"}
            {log.result === "HOLD" && expired && (
              <span style={{ marginLeft: 8, fontWeight: 800, color: "#dc2626" }}>
                （{UI_TEXT.pages.result.HOLD.expiredBadge}）
              </span>
            )}
          </div>
        </div>

        {log.result === "HOLD" && expired && (
          <p style={{ marginTop: 12, fontWeight: 800, color: "#dc2626" }}>
            {UI_TEXT.pages.result.HOLD.expiredMessage}
          </p>
        )}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800 }}>{UI_TEXT.pages.logDetail.fields.answers}</h2>

        <div style={{ marginTop: 12, display: "grid", gap: 12 }}>
          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
              }}
            >
              <div style={{ fontWeight: 800 }}>
                {q.id}: {q.text}
              </div>
              <div style={{ marginTop: 6 }}>
                {triStateLabel(answersJson[q.id])}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <Link href="/decision/logs" style={{ color: "#2563eb", textDecoration: "underline" }}>
          {UI_TEXT.pages.logDetail.actions.backToLogs}
        </Link>
        <Link href="/decision/new" style={{ color: "#2563eb", textDecoration: "underline" }}>
          {UI_TEXT.pages.logDetail.actions.newDecision}
        </Link>
      </div>
    </main>
  );
}