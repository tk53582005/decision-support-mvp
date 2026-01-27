import { QUESTIONS } from "@/domain/types";
import { UI_TEXT } from "@/constants/uiText";
import { submitDecision } from "@/app/actions/decisionActions";

export default function DecisionNewPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const hasError = searchParams?.error === "missing";

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>{UI_TEXT.pages.new.title}</h1>
      <p style={{ marginTop: 8 }}>{UI_TEXT.pages.new.description}</p>

      {hasError && (
        <p style={{ marginTop: 16, fontWeight: 600, color: "#dc2626" }}>
          {UI_TEXT.pages.new.validationError}
        </p>
      )}

      <form action={submitDecision} style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700 }}>
          {UI_TEXT.pages.new.sectionTitle}
        </h2>

        <div style={{ marginTop: 16, display: "grid", gap: 16 }}>
          {QUESTIONS.map((q) => (
            <fieldset
              key={q.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
              }}
            >
              <legend style={{ padding: "0 6px", fontWeight: 700 }}>
                {q.id}: {q.text}
              </legend>

              <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                <label style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                  <input type="radio" name={q.id} value="YES" />
                  {UI_TEXT.triState.YES}
                </label>

                <label style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                  <input type="radio" name={q.id} value="NO" />
                  {UI_TEXT.triState.NO}
                </label>

                <label style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                  <input type="radio" name={q.id} value="UNKNOWN" />
                  {UI_TEXT.triState.UNKNOWN}
                </label>
              </div>
            </fieldset>
          ))}
        </div>

        <button
          type="submit"
          style={{
            marginTop: 24,
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #111",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {UI_TEXT.pages.new.submit}
        </button>
      </form>
    </main>
  );
}