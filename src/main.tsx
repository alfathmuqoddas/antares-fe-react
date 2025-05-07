import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import "./index.css";
import App from "./App.tsx";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import LoadingPage from "./pages/loading/index";
const LoginPage = lazy(() => import("./pages/login/index.tsx"));
const RegisterPage = lazy(() => import("./pages/register/index.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<LoadingPage />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route path="/" element={<App />} />
          <Route path="/test" element={<>Test</>} />
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>
);
