import Games from "./components/Games";
import GlobalStyles from "./components/GlobalStyles";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <Games />
      <Outlet />
    </div>
  );
};

export default App;
