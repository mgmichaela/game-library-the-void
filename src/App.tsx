import { Routes, Route } from "react-router-dom";
import GlobalStyles from "./components/GlobalStyles";
import Games from "./components/Games";
import GameDetails from "./components/GameDetails";

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Games />
    </div>
  );
};

export default App;
