import { NavLink, Outlet } from "react-router-dom";
import { BookOpen, ListChecks, Trophy } from "lucide-react";
import { VOCAB } from "@/shared/data/vocab";

const tabs = [
  { to: "/browse", label: "Browse", Icon: BookOpen },
  { to: "/quiz", label: "Quiz", Icon: ListChecks },
  { to: "/progress", label: "Progress", Icon: Trophy },
];

export function DeckNav() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 p-4 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <h1 className="text-xl font-bold text-slate-800 mb-3">JLPT N4 — {VOCAB.length} words</h1>
        <div className="flex gap-2 mb-4">
          {tabs.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 ${
                  isActive ? "bg-slate-800 text-white" : "bg-white text-slate-600"
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
}
