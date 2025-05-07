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
const UnauthorizedPage = lazy(() => import("./pages/unauthorized/index.tsx"));
const NotFoundPage = lazy(() => import("./pages/notFound/index.tsx"));
import ProtectedRoute from "./layout/protectedLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<LoadingPage />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route index element={<App />} />
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="admin" element={<>Admin</>} />
          </Route>
          <Route path="test" element={<>Test</>} />
          <Route
            path="unauthorized"
            element={
              <Suspense fallback={<LoadingPage />}>
                <UnauthorizedPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingPage />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>
);
