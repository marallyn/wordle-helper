import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import WordleHelper from "./WordleHelper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WordleHelper />
  </StrictMode>
);
