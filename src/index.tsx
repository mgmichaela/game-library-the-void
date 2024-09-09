import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { PopularGamesProvider } from "./context/PopularGamesContext";
import { UpcomingGamesProvider } from "./context/UpcomingGamesContext";
import { GameDetailsProvider } from "./context/GameDetailsContext";
import { GameScreenshotsProvider } from "./context/GameScreenshotsContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { GameSearchProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PopularGamesProvider>
      <UpcomingGamesProvider>
        <GameDetailsProvider>
          <GameScreenshotsProvider>
            <GameSearchProvider>
              <RouterProvider router={router} />
            </GameSearchProvider>
          </GameScreenshotsProvider>
        </GameDetailsProvider>
      </UpcomingGamesProvider>
    </PopularGamesProvider>
  </React.StrictMode>
);

reportWebVitals();
