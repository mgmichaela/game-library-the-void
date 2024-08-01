import React from "react";
import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Games from "./components/Games";
import GameDetails from "./components/GameDetails";

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Routes>
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/" element={<Games />} />
      </Routes>
    </div>
  );
};

export default App;
