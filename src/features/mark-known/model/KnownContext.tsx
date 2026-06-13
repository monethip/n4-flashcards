import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type KnownMap = Record<number, boolean>;

interface KnownContextValue {
  known: KnownMap;
  toggleKnown: (idx: number) => void;
  reset: () => void;
}

const STORAGE_KEY = "n4-known";
const KnownContext = createContext<KnownContextValue | null>(null);

function load(): KnownMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as KnownMap) : {};
  } catch {
    return {};
  }
}

export function KnownProvider({ children }: { children: ReactNode }) {
  const [known, setKnown] = useState<KnownMap>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(known));
    } catch {
      /* ignore */
    }
  }, [known]);

  const toggleKnown = (idx: number) =>
    setKnown((k) => ({ ...k, [idx]: !k[idx] }));
  const reset = () => setKnown({});

  return (
    <KnownContext.Provider value={{ known, toggleKnown, reset }}>
      {children}
    </KnownContext.Provider>
  );
}

export function useKnown(): KnownContextValue {
  const ctx = useContext(KnownContext);
  if (!ctx) throw new Error("useKnown must be used within KnownProvider");
  return ctx;
}
