import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { PopularGamesProvider } from "./context/PopularGamesContext";
import { UpcomingGamesProvider } from "./context/UpcomingGamesContext";
import { NewGamesProvider } from "./context/NewGamesContext";
import { GameDetailsProvider } from "./context/GameDetailsContext";
import { GameScreenshotsProvider } from "./context/GameScreenshotsContext";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PopularGamesProvider>
      <UpcomingGamesProvider>
        <NewGamesProvider>
          <GameDetailsProvider>
            <GameScreenshotsProvider>
              <RouterProvider router={router} />
            </GameScreenshotsProvider>
          </GameDetailsProvider>
        </NewGamesProvider>
      </UpcomingGamesProvider>
    </PopularGamesProvider>
  </React.StrictMode>
);

reportWebVitals();
