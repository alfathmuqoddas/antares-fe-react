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
const MoviesPage = lazy(() => import("./pages/movies/index.tsx"));
const MovieDetailsPage = lazy(() => import("./pages/movieDetails/index.tsx"));
const CinemasPage = lazy(() => import("./pages/cinemas/index.tsx"));
const AdminMoviesPage = lazy(() => import("./pages/admin/movies/index.tsx"));
const AdminScreensPage = lazy(() => import("./pages/admin/screens/index.tsx"));
const AdminShowtimesPage = lazy(
  () => import("./pages/admin/showtimes/index.tsx")
);
const AdminTheatersPage = lazy(
  () => import("./pages/admin/theaters/index.tsx")
);
const AdminTheatersDetailsPage = lazy(
  () => import("./pages/admin/theaters/details/index.tsx")
);
import ProtectedRoute from "./layout/protectedLayout.tsx";
import MainLayout from "./layout/mainLayout.tsx";

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
          <Route element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<LoadingPage />}>
                  <App />
                </Suspense>
              }
            />
            <Route
              path="movies"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <MoviesPage />
                </Suspense>
              }
            />
            <Route
              path="movies/:id"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <MovieDetailsPage />
                </Suspense>
              }
            />
            <Route
              path="cinema"
              element={
                <Suspense fallback={<LoadingPage />}>
                  <CinemasPage />
                </Suspense>
              }
            />
            <Route
              path="admin"
              element={<ProtectedRoute allowedRoles={["admin"]} />}
            >
              <Route index element={<>Admin</>} />
              <Route
                path="theaters"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <AdminTheatersPage />
                  </Suspense>
                }
              />
              <Route
                path="theaters/:id"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <AdminTheatersDetailsPage />
                  </Suspense>
                }
              />
              <Route
                path="screens"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <AdminScreensPage />
                  </Suspense>
                }
              />
              <Route
                path="movies"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <AdminMoviesPage />
                  </Suspense>
                }
              />
              <Route
                path="showtimes"
                element={
                  <Suspense fallback={<LoadingPage />}>
                    <AdminShowtimesPage />
                  </Suspense>
                }
              />
            </Route>
            <Route path="dashboard" element={<>User</>} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>
);
