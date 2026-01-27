-- CreateTable
CREATE TABLE "DecisionLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answersJson" JSONB NOT NULL,
    "result" TEXT NOT NULL,
    "holdUntil" DATETIME,
    "logicVersion" TEXT NOT NULL DEFAULT 'v1'
);
