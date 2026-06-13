import { VOCAB } from "@/shared/data/vocab";
import type { KanaGroup } from "@/entities/word/model/types";

export const GROUPS: KanaGroup[] = Array.from(new Set(VOCAB.map((v) => v.g)));

export function indicesForGroup(group: KanaGroup | "all"): number[] {
  return VOCAB.map((_, i) => i).filter(
    (i) => group === "all" || VOCAB[i].g === group
  );
}

export interface SectionStat {
  g: KanaGroup;
  total: number;
  done: number;
  complete: boolean;
}

export function sectionStats(known: Record<number, boolean>): SectionStat[] {
  const map: Record<string, { total: number; done: number }> = {};
  VOCAB.forEach((v, i) => {
    if (!map[v.g]) map[v.g] = { total: 0, done: 0 };
    map[v.g].total += 1;
    if (known[i]) map[v.g].done += 1;
  });
  return Object.entries(map).map(([g, s]) => ({
    g,
    total: s.total,
    done: s.done,
    complete: s.done === s.total,
  }));
}
