import { lazy, Suspense } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../pages/mainPage/MainPage";
import NotFoundPage from "../../pages/notFoundPage/NotFoundPage";
import { loader as detailLoader } from "../../components/movieDetail/MovieDetail";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

export const queryClient = new QueryClient();
const DetailPage = lazy(() => import("../../pages/detailPage/DetailPage"));
const MoviesPage = lazy(() => import("../../pages/moviesPage/Movies"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MoviesPage />
          </Suspense>
        )
      },
      {
        path: "movie/:id",
        loader: detailLoader,
        errorElement: <ErrorBoundary />,
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <DetailPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
