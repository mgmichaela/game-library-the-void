import React, { useContext } from "react";
import { PopularGamesContext } from "./context/PopularGamesContext";
import Game from "./components/Game";
import Loader from "./components/Loader";
import styled from "styled-components";
import { motion } from "framer-motion";
import { UpcomingGamesContext } from "./context/UpcomingGamesContext";

const App: React.FC = () => {
  const upcomingGamesContext = useContext(UpcomingGamesContext);
  const { upcomingGames, loading, error } = upcomingGamesContext;

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!upcomingGames) return <p>No data available</p>;

  return (
    <div>
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
`;

export default App;
