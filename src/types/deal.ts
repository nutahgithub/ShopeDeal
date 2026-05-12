export type DealScoreLevel = "excellent" | "good" | "fair" | "risky";

export type DealScore = {
  value: number;
  level: DealScoreLevel;
  label: string;
  reasons: string[];
};
