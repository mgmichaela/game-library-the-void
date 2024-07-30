import React, { useContext } from "react";
import { PopularGamesContext } from "./context/PopularGamesContext";
import Game from "./components/Game";
import Loader from "./components/Loader";
import styled from "styled-components";
import { motion } from "framer-motion";
import { UpcomingGamesContext } from "./context/UpcomingGamesContext";
import GlobalStyles from "./components/GlobalStyles";
import { NewGamesContext } from "./context/NewGamesContext";

const App: React.FC = () => {
  const upcomingGamesContext = useContext(UpcomingGamesContext);
  const { upcomingGames, loading, error } = upcomingGamesContext;

  const popularGamesContext = useContext(PopularGamesContext);
  const { popularGames } = popularGamesContext;

  const newGamesContext = useContext(NewGamesContext);
  const { newGames } = newGamesContext;

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!upcomingGames) return <p>No data available</p>;

  return (
    <div>
      <GlobalStyles />
      <GameList>
        <h2>Upcoming Games</h2>
        <Games>
          {upcomingGames.results.map((game) => (
            <Game
              key={game.name}
              name={game.name}
              released={game.released}
              image={game.background_image}
            />
          ))}
        </Games>

        {popularGames && (
          <>
            <h2>Popular Games</h2>
            <Games>
              {popularGames?.results.map((game) => (
                <Game
                  key={game.name}
                  name={game.name}
                  released={game.released}
                  image={game.background_image}
                />
              ))}
            </Games>
          </>
        )}

        {newGames && (
          <>
            <h2>New Games</h2>
            <Games>
              {newGames.results.map((game) => (
                <Game
                  key={game.name}
                  name={game.name}
                  released={game?.released}
                  image={game.background_image}
                />
              ))}
            </Games>
          </>
        )}
      </GameList>
    </div>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default App;
