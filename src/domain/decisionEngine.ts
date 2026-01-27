import { Answers, DecisionResult } from "./types";

type DecisionDetail = {
  result: DecisionResult;
  reasons: string[];
};

export function decide(answers: Answers): DecisionDetail {
  const values = Object.values(answers);
  const noCount = values.filter((v) => v === "NO").length;
  const unknownCount = values.filter((v) => v === "UNKNOWN").length;

  const reasons: string[] = [];

  // EXIT
  if (answers.Q1 === "NO") reasons.push("Q1がNo（要件合意なし）");
  if (answers.Q2 === "NO") reasons.push("Q2がNo（納期が非現実的）");
  if (noCount >= 2) reasons.push("Noが2つ以上");
  if (unknownCount >= 3) reasons.push("Unknownが3つ以上");

  if (reasons.length > 0) {
    return { result: "EXIT", reasons };
  }

  // HOLD
  if (unknownCount >= 1) reasons.push("Unknownが1つ以上");
  if (answers.Q3 === "UNKNOWN") reasons.push("Q3がUnknown（見積未確定）");
  if (answers.Q5 === "UNKNOWN") reasons.push("Q5がUnknown（前提未確定）");

  if (reasons.length > 0) {
    return { result: "HOLD", reasons };
  }

  return { result: "PROCEEDABLE", reasons: [] };
}