import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@pirenily-ui/tokens";
import "./docs.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
