import Link from "next/link";
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

export default async function DecisionLogsPage() {
  const logs = await prisma.decisionLog.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, createdAt: true, result: true, holdUntil: true },
  });

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>{UI_TEXT.pages.logs.title}</h1>
      <p style={{ marginTop: 8 }}>{UI_TEXT.pages.logs.description}</p>

      {logs.length === 0 ? (
        <p style={{ marginTop: 16 }}>{UI_TEXT.pages.logs.empty}</p>
      ) : (
        <div style={{ marginTop: 16, overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>
                  {UI_TEXT.pages.logs.table.createdAt}
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>
                  {UI_TEXT.pages.logs.table.result}
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>
                  {UI_TEXT.pages.logs.table.holdUntil}
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>
                  {UI_TEXT.pages.logs.table.status}
                </th>
                <th style={{ textAlign: "left", borderBottom: "1px solid #ddd", padding: "8px" }}>
                  {UI_TEXT.pages.logs.table.action}
                </th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => {
                const now = new Date();
                const expired =
                  log.holdUntil != null && now.getTime() > new Date(log.holdUntil).getTime();

                return (
                  <tr key={log.id}>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                      {formatDateTimeJa(new Date(log.createdAt))}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px", fontWeight: 700 }}>
                      {log.result}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                      {log.holdUntil ? formatDateTimeJa(new Date(log.holdUntil)) : "-"}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                      {expired ? UI_TEXT.pages.logs.status.expired : UI_TEXT.pages.logs.status.normal}
                    </td>
                    <td style={{ borderBottom: "1px solid #eee", padding: "8px" }}>
                      <Link href={`/decision/logs/${log.id}`} style={{ color: "#2563eb", textDecoration: "underline" }}>
                        {UI_TEXT.pages.logs.actions.openDetail}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}