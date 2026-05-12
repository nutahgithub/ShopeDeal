import { Badge } from "@/components/ui/badge";
import type { DealScore } from "@/types/deal";

type DealScoreBadgeProps = {
  dealScore: DealScore;
};

export function DealScoreBadge({ dealScore }: DealScoreBadgeProps) {
  const toneByLevel = {
    excellent: "success",
    good: "success",
    fair: "warning",
    risky: "danger",
  } as const;

  return (
    <Badge tone={toneByLevel[dealScore.level]}>
      {dealScore.value} · {dealScore.label}
    </Badge>
  );
}
