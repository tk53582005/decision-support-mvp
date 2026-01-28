"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/server/db";
import { decide } from "@/domain/decisionEngine";
import { Answers, TriState } from "@/domain/types";

function parseTriState(value: FormDataEntryValue | null): TriState | null {
  if (value === "YES" || value === "NO" || value === "UNKNOWN") return value;
  return null;
}

export async function submitDecision(formData: FormData) {
  const answers: Partial<Answers> = {
    Q1: parseTriState(formData.get("Q1")) ?? undefined,
    Q2: parseTriState(formData.get("Q2")) ?? undefined,
    Q3: parseTriState(formData.get("Q3")) ?? undefined,
    Q4: parseTriState(formData.get("Q4")) ?? undefined,
    Q5: parseTriState(formData.get("Q5")) ?? undefined,
  };

  const missing = (Object.entries(answers) as [keyof Answers, TriState | undefined][])
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length > 0) {
    redirect(`/decision/new?error=missing`);
  }

  const fixedAnswers = answers as Answers;
  const decision = decide(fixedAnswers);

  const now = new Date();
  const holdUntil =
    decision.result === "HOLD" ? new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000) : null;

  const log = await prisma.decisionLog.create({
    data: {
      answersJson: fixedAnswers,
      result: decision.result,
      holdUntil,
      logicVersion: "v1",
    },
    select: { id: true },
  });

  redirect(`/decision/result/${log.id}`);
}