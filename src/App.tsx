import { useState } from "react";
import Games from "./components/Games";
import GlobalStyles from "./components/GlobalStyles";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

const App = () => {
  const [showDefaultGames, setShowDefaultGames] = useState<boolean>(true);

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
