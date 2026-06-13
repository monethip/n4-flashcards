import { GROUPS } from "@/entities/section/model/sections";
import type { KanaGroup } from "@/entities/word/model/types";

interface SectionFilterProps {
  value: KanaGroup | "all";
  onChange: (g: KanaGroup | "all") => void;
}

export function SectionFilter({ value, onChange }: SectionFilterProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {(["all", ...GROUPS] as (KanaGroup | "all")[]).map((g) => (
        <button
          key={g}
          onClick={() => onChange(g)}
          className={`px-2.5 py-1 rounded-lg text-sm ${
            value === g ? "bg-indigo-500 text-white" : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {g === "all" ? "All" : g}
        </button>
      ))}
    </div>
  );
}
