export type TriState = "YES" | "NO" | "UNKNOWN";
export type DecisionResult = "EXIT" | "HOLD" | "PROCEEDABLE";

export type QuestionId = "Q1" | "Q2" | "Q3" | "Q4" | "Q5";
export type Answers = Record<QuestionId, TriState>;

export const QUESTIONS: { id: QuestionId; text: string }[] = [
  { id: "Q1", text: "要件は文章で合意済みか？" },
  { id: "Q2", text: "納期は現実的か？" },
  { id: "Q3", text: "見積（工数/金額）は確定しているか？" },
  { id: "Q4", text: "技術的リスクは許容範囲か？" },
  { id: "Q5", text: "受注に必要な前提（アカウント/権限/素材など）は揃っているか？" },
] as const;