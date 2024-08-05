import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GameDetailsPage from "../pages/GameDetailsPage";
import NotFound from "../components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "games/:id",
        element: <GameDetailsPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
