import { useState } from "react";
import { Eye, Check } from "lucide-react";
import { WordFront } from "@/entities/word/ui/WordFront";
import { VOCAB } from "@/shared/data/vocab";
import { useKnown } from "@/features/mark-known/model/KnownContext";

interface FlipCardProps {
  idx: number;
}

export function FlipCard({ idx }: FlipCardProps) {
  const [revealed, setRevealed] = useState(false);
  const { known } = useKnown();
  const card = VOCAB[idx];

  return (
    <div
      onClick={() => setRevealed((r) => !r)}
      className="relative cursor-pointer select-none rounded-2xl shadow-lg bg-white h-64 flex flex-col items-center justify-center p-6 text-center hover:shadow-xl transition"
    >
      {known[idx] && <Check className="absolute top-4 right-4 text-emerald-500" size={20} />}
      <WordFront kanji={card.k} />
      {!revealed ? (
        <div className="text-sm text-slate-300 mt-6 flex items-center gap-1">
          <Eye size={14} /> tap to reveal reading &amp; meaning
        </div>
      ) : (
        <div className="mt-4">
          <div className="text-2xl text-indigo-600 font-medium">{card.r}</div>
          <div className="text-sm text-slate-400 mb-2">{card.ro}</div>
          <div className="text-lg text-slate-700">{card.en}</div>
        </div>
      )}
    </div>
  );
}
