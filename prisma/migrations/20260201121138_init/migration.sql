-- CreateEnum
CREATE TYPE "DecisionResult" AS ENUM ('EXIT', 'HOLD', 'PROCEEDABLE');

-- CreateTable
CREATE TABLE "DecisionLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answersJson" JSONB NOT NULL,
    "result" "DecisionResult" NOT NULL,
    "holdUntil" TIMESTAMP(3),
    "logicVersion" TEXT NOT NULL DEFAULT 'v1',

    CONSTRAINT "DecisionLog_pkey" PRIMARY KEY ("id")
);
