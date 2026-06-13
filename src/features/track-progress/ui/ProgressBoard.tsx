import { useMemo } from "react";
import { Bell, Check, Loader } from "lucide-react";
import { Blob } from "@/shared/ui/Blob";
import { VOCAB } from "@/shared/data/vocab";
import { sectionStats } from "@/entities/section/model/sections";
import { useKnown } from "@/features/mark-known/model/KnownContext";

const CARD_COLORS = ["#ec4899", "#22c55e", "#f59e0b", "#6366f1", "#06b6d4"];

export function ProgressBoard() {
  const { known } = useKnown();
  const total = VOCAB.length;
  const mastered = VOCAB.reduce((n, _, i) => n + (known[i] ? 1 : 0), 0);
  const pct = Math.round((mastered / total) * 100);
  const level = Math.floor(mastered / 50) + 1;

  const sections = useMemo(() => sectionStats(known), [known]);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-5">
      <div className="flex items-start justify-between mb-5">
        <h2 className="text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
          YOUR<br />PROGRESS
        </h2>
        <Bell className="text-slate-800" size={22} />
      </div>

      <div className="bg-slate-100 rounded-2xl p-4 mb-4">
        <div className="flex items-end justify-between mb-1">
          <div>
            <div className="text-xs text-slate-400 font-medium">Your score</div>
            <div className="text-2xl font-extrabold text-slate-900">LEVEL {level}</div>
          </div>
          <div className="text-lg font-bold text-slate-900">{pct}%</div>
        </div>
        <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full rounded-full bg-indigo-500 transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-xs text-slate-400 mt-2">{mastered} of {total} words mastered</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sections.map((s, i) => {
          const active = s.done > 0;
          const color = active ? CARD_COLORS[i % CARD_COLORS.length] : "#cbd5e1";
          return (
            <div key={s.g} className="bg-slate-100 rounded-2xl p-4 overflow-hidden">
              <div className="font-extrabold text-slate-900 text-lg">{s.g} section</div>
              <div className={`text-xs mt-1 flex items-center gap-1 ${s.complete ? "text-emerald-600" : active ? "text-slate-500" : "text-slate-400"}`}>
                {s.complete ? <><Check size={13} /> Complete</> : active ? <><Loader size={13} /> In progress</> : <>Locked</>}
              </div>
              <div className="text-[11px] text-slate-400 mb-1">{s.done}/{s.total}</div>
              <div className="w-16 h-16 mx-auto"><Blob color={color} face={active} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
