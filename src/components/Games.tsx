import { usePopularGamesContext } from "../context/PopularGamesContext";
import Game from "../components/Game";
import Loader from "../components/Loader";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useUpcomingGamesContext } from "../context/UpcomingGamesContext";
import { useNewGamesContext } from "../context/NewGamesContext";

const Games = () => {
  const { popularGames, loadingPopularGames, popularGamesError } =
    usePopularGamesContext();

  const { upcomingGames, loadingUpcomingGames, upcomingGamesError } =
    useUpcomingGamesContext();

  const { newGames, loadingNewGames, newGamesError } = useNewGamesContext();

  if (loadingPopularGames || loadingNewGames || loadingUpcomingGames)
    return <Loader />;

  if (popularGamesError) return <p>Error: {popularGamesError.message}</p>;
  if (newGamesError) return <p>Error: {newGamesError.message}</p>;
  if (upcomingGamesError) return <p>Error: {upcomingGamesError.message}</p>;

  return (
    <GameWrapper>
      {upcomingGames && (
        <>
          <h2>Upcoming Games</h2>
          <GamesStyling>
            {upcomingGames.results.map((game) => (
              <Game
                key={game.id}
                name={game.name}
                released={game.released}
                image={game.background_image}
                gameID={game.id}
              />
            ))}
          </GamesStyling>
        </>
      )}

      {popularGames && (
        <>
          <h2>Popular Games</h2>
          <GamesStyling>
            {popularGames.results.map((game) => (
              <Game
                key={game.id}
                name={game.name}
                released={game.released}
                image={game.background_image}
                gameID={game.id}
              />
            ))}
          </GamesStyling>
        </>
      )}

      {newGames && (
        <>
          <h2>New Games</h2>
          <GamesStyling>
            {newGames.results.map((game) => (
              <Game
                key={game.id}
                name={game.name}
                released={game.released}
                image={game.background_image}
                gameID={game.id}
              />
            ))}
          </GamesStyling>
        </>
      )}
    </GameWrapper>
  );
};

const GameWrapper = styled(motion.div)`
  padding: 0rem 5rem;
  h2 {
    padding: 5rem 0rem;
  }
`;

const GamesStyling = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Games;
