import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@xyflow/react/dist/style.css";
import "./index.css";
import App from "./App.tsx";
import { TooltipProvider } from "@radix-ui/react-tooltip";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider delayDuration={0}>
      <App />
    </TooltipProvider>
  </StrictMode>
);
