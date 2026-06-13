import { useMemo, useState } from "react";
import { SectionFilter } from "@/widgets/section-filter/SectionFilter";
import { QuizRunner } from "@/features/take-quiz/ui/QuizRunner";
import { indicesForGroup } from "@/entities/section/model/sections";
import type { KanaGroup } from "@/entities/word/model/types";

export function QuizPage() {
  const [group, setGroup] = useState<KanaGroup | "all">("all");
  const indices = useMemo(() => indicesForGroup(group), [group]);
  return (
    <>
      <SectionFilter value={group} onChange={setGroup} />
      <QuizRunner key={group} indices={indices} />
    </>
  );
}
