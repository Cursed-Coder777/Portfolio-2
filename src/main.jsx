// Entry point — mounts the React app into the DOM (#root).
// Imports global styles (reset + fonts) and the root component.
// React Router v7 routes: "/" → 3D museum, "/projects" → project grid.

import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.scss";
import App from "./App.jsx";
import Projects from "./pages/Projects.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  </BrowserRouter>
);
