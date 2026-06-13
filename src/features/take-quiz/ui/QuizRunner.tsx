import { useMemo, useState } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";
import { VOCAB } from "@/shared/data/vocab";
import { shuffle } from "@/shared/lib/shuffle";

interface QuizRunnerProps {
  indices: number[];
}

export function QuizRunner({ indices }: QuizRunnerProps) {
  const [queue, setQueue] = useState(() => shuffle(indices));
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0 });

  const idx = queue.length ? queue[qi % queue.length] : 0;
  const choices = useMemo(() => {
    if (indices.length < 4) return [];
    const others = shuffle(indices.filter((i) => i !== idx)).slice(0, 3);
    return shuffle([idx, ...others]);
  }, [idx, indices]);

  if (indices.length < 4) {
    return (
      <div className="bg-white rounded-2xl p-6 text-center text-slate-500 shadow">
        Need at least 4 words in this group for quiz mode.
      </div>
    );
  }

  const choose = (ci: number) => {
    if (picked !== null) return;
    setPicked(ci);
    setScore((s) => ({ right: s.right + (ci === idx ? 1 : 0), total: s.total + 1 }));
  };

  const next = () => {
    setPicked(null);
    if ((qi + 1) % queue.length === 0) setQueue(shuffle(indices));
    setQi((i) => i + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 text-sm">
        <span className="text-slate-500">Score: {score.right} / {score.total}</span>
        <button
          onClick={() => { setQueue(shuffle(indices)); setQi(0); setPicked(null); setScore({ right: 0, total: 0 }); }}
          className="text-slate-400 flex items-center gap-1 hover:text-slate-600"
        >
          <RotateCcw size={14} /> Restart
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-4 text-center">
        <div className="text-xs text-slate-400 mb-2">What does this mean?</div>
        <div className="text-6xl font-bold text-slate-800">{VOCAB[idx].k}</div>
        {picked !== null && (
          <div className="mt-3 text-indigo-600 text-lg">
            {VOCAB[idx].r} <span className="text-slate-400 text-sm">({VOCAB[idx].ro})</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        {choices.map((ci) => {
          let style = "bg-white text-slate-700 hover:bg-slate-50";
          if (picked !== null) {
            if (ci === idx) style = "bg-emerald-500 text-white";
            else if (ci === picked) style = "bg-rose-400 text-white";
            else style = "bg-white text-slate-400";
          }
          return (
            <button key={ci} onClick={() => choose(ci)} className={`py-3 px-4 rounded-xl shadow text-left transition ${style}`}>
              {VOCAB[ci].en}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <button onClick={next} className="w-full mt-4 py-3 rounded-xl bg-slate-800 text-white font-medium shadow hover:bg-slate-700 flex items-center justify-center gap-2">
          Next <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}
