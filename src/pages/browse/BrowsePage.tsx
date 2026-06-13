import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle, Check } from "lucide-react";
import { SectionFilter } from "@/widgets/section-filter/SectionFilter";
import { FlipCard } from "@/features/flip-card/ui/FlipCard";
import { useKnown } from "@/features/mark-known/model/KnownContext";
import { indicesForGroup } from "@/entities/section/model/sections";
import { shuffle } from "@/shared/lib/shuffle";
import type { KanaGroup } from "@/entities/word/model/types";

export function BrowsePage() {
  const [group, setGroup] = useState<KanaGroup | "all">("all");
  const indices = useMemo(() => indicesForGroup(group), [group]);
  const [order, setOrder] = useState(indices);
  const [pos, setPos] = useState(0);
  const { known, toggleKnown } = useKnown();

  useEffect(() => { setOrder(indices); setPos(0); }, [indices]);

  if (order.length === 0) return <SectionFilter value={group} onChange={setGroup} />;

  const idx = order[pos % order.length];
  const knownCount = order.filter((i) => known[i]).length;
  const go = (d: number) => setPos((p) => (p + d + order.length) % order.length);

  return (
    <>
      <SectionFilter value={group} onChange={setGroup} />
      <div className="flex items-center justify-between mb-2 text-sm text-slate-500">
        <span>{(pos % order.length) + 1} / {order.length}</span>
        <span className="text-emerald-600">Known: {knownCount}</span>
      </div>

      <FlipCard idx={idx} />

      <div className="flex items-center justify-center gap-3 mt-5">
        <button onClick={() => go(-1)} className="p-3 rounded-xl bg-white shadow hover:bg-slate-50 text-slate-600"><ChevronLeft size={22} /></button>
        <button
          onClick={() => toggleKnown(idx)}
          className={`px-5 py-3 rounded-xl shadow font-medium flex items-center gap-2 ${known[idx] ? "bg-emerald-500 text-white" : "bg-white text-slate-700 hover:bg-slate-50"}`}
        >
          <Check size={18} /> {known[idx] ? "Known" : "Mark known"}
        </button>
        <button onClick={() => go(1)} className="p-3 rounded-xl bg-white shadow hover:bg-slate-50 text-slate-600"><ChevronRight size={22} /></button>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <button onClick={() => { setOrder(shuffle(order)); setPos(0); }} className="px-4 py-2 rounded-xl bg-slate-800 text-white shadow flex items-center gap-2 text-sm hover:bg-slate-700">
          <Shuffle size={16} /> Shuffle
        </button>
      </div>
    </>
  );
}
