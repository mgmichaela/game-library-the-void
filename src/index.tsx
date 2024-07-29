import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PopularGamesProvider } from "./context/PopularGamesContext";
import { UpcomingGamesProvider } from "./context/UpcomingGamesContext";
import { NewGamesProvider } from "./context/NewGamesContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PopularGamesProvider>
      <UpcomingGamesProvider>
        <NewGamesProvider>
          <App />
        </NewGamesProvider>
      </UpcomingGamesProvider>
    </PopularGamesProvider>
  </React.StrictMode>
);

reportWebVitals();
