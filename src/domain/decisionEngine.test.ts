import { describe, test, expect } from "vitest";
import { decide } from "./decisionEngine";
import { Answers } from "./types";

describe("decisionEngine", () => {
  const baseYes: Answers = {
    Q1: "YES",
    Q2: "YES",
    Q3: "YES",
    Q4: "YES",
    Q5: "YES",
  };

  describe("PROCEEDABLE cases", () => {
    test("all YES => PROCEEDABLE", () => {
      const result = decide(baseYes);
      expect(result.result).toBe("PROCEEDABLE");
      expect(result.reasons).toHaveLength(0);
    });

    test("1 No (not Q1/Q2) => PROCEEDABLE", () => {
      const result = decide({ ...baseYes, Q3: "NO" });
      expect(result.result).toBe("PROCEEDABLE");
    });
  });

  describe("EXIT cases", () => {
    test("Q1 NO => EXIT", () => {
      const result = decide({ ...baseYes, Q1: "NO" });
      expect(result.result).toBe("EXIT");
      expect(result.reasons).toContain("Q1がNo（要件合意なし）");
    });

    test("Q2 NO => EXIT", () => {
      const result = decide({ ...baseYes, Q2: "NO" });
      expect(result.result).toBe("EXIT");
      expect(result.reasons).toContain("Q2がNo（納期が非現実的）");
    });

    test("noCount >= 2 => EXIT", () => {
      const result = decide({ ...baseYes, Q3: "NO", Q4: "NO" });
      expect(result.result).toBe("EXIT");
      expect(result.reasons).toContain("Noが2つ以上");
    });

    test("unknownCount >= 3 => EXIT", () => {
      const result = decide({
        ...baseYes,
        Q3: "UNKNOWN",
        Q4: "UNKNOWN",
        Q5: "UNKNOWN",
      });
      expect(result.result).toBe("EXIT");
      expect(result.reasons).toContain("Unknownが3つ以上");
    });

    test("Q1 NO + Q2 NO => EXIT (multiple reasons)", () => {
      const result = decide({ ...baseYes, Q1: "NO", Q2: "NO" });
      expect(result.result).toBe("EXIT");
      expect(result.reasons.length).toBeGreaterThan(0);
    });
  });

  describe("HOLD cases", () => {
    test("1 Unknown => HOLD", () => {
      const result = decide({ ...baseYes, Q4: "UNKNOWN" });
      expect(result.result).toBe("HOLD");
      expect(result.reasons).toContain("Unknownが1つ以上");
    });

    test("Q3 Unknown => HOLD", () => {
      const result = decide({ ...baseYes, Q3: "UNKNOWN" });
      expect(result.result).toBe("HOLD");
      expect(result.reasons).toContain("Q3がUnknown（見積未確定）");
    });

    test("Q5 Unknown => HOLD", () => {
      const result = decide({ ...baseYes, Q5: "UNKNOWN" });
      expect(result.result).toBe("HOLD");
      expect(result.reasons).toContain("Q5がUnknown（前提未確定）");
    });

    test("2 Unknown => HOLD (not EXIT)", () => {
      const result = decide({ ...baseYes, Q3: "UNKNOWN", Q4: "UNKNOWN" });
      expect(result.result).toBe("HOLD");
    });
  });

  describe("Edge cases", () => {
    test("all NO => EXIT", () => {
      const allNo: Answers = {
        Q1: "NO",
        Q2: "NO",
        Q3: "NO",
        Q4: "NO",
        Q5: "NO",
      };
      const result = decide(allNo);
      expect(result.result).toBe("EXIT");
    });

    test("all UNKNOWN => EXIT", () => {
      const allUnknown: Answers = {
        Q1: "UNKNOWN",
        Q2: "UNKNOWN",
        Q3: "UNKNOWN",
        Q4: "UNKNOWN",
        Q5: "UNKNOWN",
      };
      const result = decide(allUnknown);
      expect(result.result).toBe("EXIT");
      expect(result.reasons).toContain("Unknownが3つ以上");
    });

    test("Q1 YES, Q2 YES, Q3 NO, Q4 NO, Q5 YES => EXIT (noCount=2)", () => {
      const result = decide({
        Q1: "YES",
        Q2: "YES",
        Q3: "NO",
        Q4: "NO",
        Q5: "YES",
      });
      expect(result.result).toBe("EXIT");
      expect(result.reasons).toContain("Noが2つ以上");
    });
  });
});