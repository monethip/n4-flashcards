import { createBrowserRouter, Navigate } from "react-router-dom";
import { DeckNav } from "@/widgets/deck-nav/DeckNav";
import { BrowsePage } from "@/pages/browse/BrowsePage";
import { QuizPage } from "@/pages/quiz/QuizPage";
import { ProgressPage } from "@/pages/progress/ProgressPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <DeckNav />,
      children: [
        { index: true, element: <Navigate to="/browse" replace /> },
        { path: "browse", element: <BrowsePage /> },
        { path: "quiz", element: <QuizPage /> },
        { path: "progress", element: <ProgressPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/" },
);
