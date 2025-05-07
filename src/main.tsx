import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import LoginPage from "./pages/login/index.tsx";
import RegisterPage from "./pages/register/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<App />} />
        <Route path="/test" element={<>Test</>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
