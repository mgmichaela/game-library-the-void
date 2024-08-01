import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PopularGamesProvider } from "./context/PopularGamesContext";
import { UpcomingGamesProvider } from "./context/UpcomingGamesContext";
import { NewGamesProvider } from "./context/NewGamesContext";
import { GameDetailsProvider } from "./context/GameDetailsContext";
import { GameScreenshotsProvider } from "./context/GameScreenshots";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PopularGamesProvider>
        <UpcomingGamesProvider>
          <NewGamesProvider>
            <GameDetailsProvider>
              <GameScreenshotsProvider>
                <App />
              </GameScreenshotsProvider>
            </GameDetailsProvider>
          </NewGamesProvider>
        </UpcomingGamesProvider>
      </PopularGamesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
