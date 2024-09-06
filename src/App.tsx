import { useState, useEffect } from "react";
import Games from "./components/Games";
import GlobalStyles from "./components/GlobalStyles";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import Warning from "./components/Warning";

const App = () => {
  const [showDefaultGames, setShowDefaultGames] = useState<boolean>(true);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const ageConfirmed = localStorage.getItem("isAgeConfirmed");

    if (ageConfirmed === "true") {
      setIsAgeConfirmed(true);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div>
      <GlobalStyles />
      {isAgeConfirmed ? (
        <>
          <Nav setShowDefaultGames={setShowDefaultGames} />
          <Games showDefaultGames={showDefaultGames} />
        </>
      ) : (
        <Warning setIsAgeConfirmed={setIsAgeConfirmed} />
      )}
      <Outlet />
    </div>
  );
};

export default App;
