import { useState } from "react";
import { Link } from "react-router-dom";
import { usePopularGamesContext } from "../context/PopularGamesContext";
import Game from "../components/Game";
import Loader from "../components/Loader";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useUpcomingGamesContext } from "../context/UpcomingGamesContext";
import { useNewGamesContext } from "../context/NewGamesContext";
import GameDetails from "./GameDetails";

const Games = () => {
  const [isClicked, setIsClicked] = useState(false);

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
      {isClicked && (
        <GameDetails isClicked={isClicked} setIsClicked={setIsClicked} />
      )}
      {upcomingGames && (
        <>
          <h2>Upcoming Games</h2>
          <GamesStyling>
            {upcomingGames.results.map((game) => (
              <Link to={`/`} onClick={() => setIsClicked(!isClicked)}>
                <Game
                  key={game.id}
                  name={game.name}
                  released={game.released}
                  image={game.background_image}
                  gameID={game.id}
                  setIsClicked={setIsClicked}
                  isClicked={isClicked}
                />
              </Link>
            ))}
          </GamesStyling>
        </>
      )}

      {popularGames && (
        <>
          <h2>Popular Games</h2>
          <GamesStyling>
            {popularGames.results.map((game) => (
              <Link to={`/`} onClick={() => setIsClicked(!isClicked)}>
                <Game
                  key={game.id}
                  name={game.name}
                  released={game.released}
                  image={game.background_image}
                  gameID={game.id}
                  setIsClicked={setIsClicked}
                  isClicked={isClicked}
                />
              </Link>
            ))}
          </GamesStyling>
        </>
      )}

      {newGames && (
        <>
          <h2>New Games</h2>
          <GamesStyling>
            {newGames.results.map((game) => (
              <Link to={`/`} onClick={() => setIsClicked(!isClicked)}>
                <Game
                  key={game.id}
                  name={game.name}
                  released={game.released}
                  image={game.background_image}
                  gameID={game.id}
                  setIsClicked={setIsClicked}
                  isClicked={isClicked}
                />
              </Link>
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
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
`;

export default Games;
