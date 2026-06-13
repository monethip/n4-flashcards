interface WordFrontProps {
  kanji: string;
}

export function WordFront({ kanji }: WordFrontProps) {
  return <div className="text-6xl font-bold text-slate-800">{kanji}</div>;
}
