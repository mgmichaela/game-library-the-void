import Games from "./components/Games";
import GlobalStyles from "./components/GlobalStyles";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import { useState } from "react";

const App = () => {
  const [showDefaultGames, setShowDefaultGames] = useState(true);
  return (
    <div>
      <GlobalStyles />
      <Nav setShowDefaultGames={setShowDefaultGames} />
      <Games showDefaultGames={showDefaultGames} />
      <Outlet />
    </div>
  );
};

export default App;
