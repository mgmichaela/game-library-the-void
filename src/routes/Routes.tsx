import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GameDetailsPage from "../pages/GameDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "games/:id",
        element: <GameDetailsPage />,
      },
    ],
  },
]);
