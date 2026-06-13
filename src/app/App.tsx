import { RouterProvider } from "react-router-dom";
import { KnownProvider } from "@/features/mark-known/model/KnownContext";
import { router } from "./providers/router";

export function App() {
  return (
    <KnownProvider>
      <RouterProvider router={router} />
    </KnownProvider>
  );
}
