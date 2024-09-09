import { usePopularGamesContext } from "../context/PopularGamesContext";
import Game from "../components/Game";
import Loader from "../components/Loader";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useUpcomingGamesContext } from "../context/UpcomingGamesContext";
import { useGameSearch } from "../context/SearchContext";
import Pagination from "./Pagination";
import { GameListApiResponse, GameResult } from "../types/types";
import { fadeIn } from "../animations/animation";

const forbidden = process.env.REACT_APP_FORBIDDEN_WORDS
  ? process.env.REACT_APP_FORBIDDEN_WORDS.split(",")
  : [];

const Games = ({ showDefaultGames }: { showDefaultGames: boolean }) => {
  const { popularGames, loadingPopularGames, popularGamesError } =
    usePopularGamesContext();

  const { upcomingGames, loadingUpcomingGames, upcomingGamesError } =
    useUpcomingGamesContext();

  const { searchResults, totalResults, searchedGameName } = useGameSearch();

  if (loadingPopularGames || loadingUpcomingGames)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (popularGamesError) return <p>Error: {popularGamesError.message}</p>;
  if (upcomingGamesError) return <p>Error: {upcomingGamesError.message}</p>;

  const formattedResult = new Intl.NumberFormat("en-US").format(
    totalResults as number
  );

  const filterGames = (games: GameListApiResponse): GameResult[] => {
    return games.results.filter((game: GameResult) => {
      return !forbidden.some((word) => game.name.toLowerCase().includes(word));
    });
  };

  return (
    <GameWrapper initial="hidden" animate="show" variants={fadeIn}>
      {showDefaultGames ? (
        <>
          {popularGames && (
            <>
              <h2>Popular Games</h2>
              <GamesStyling>
                {filterGames(popularGames).map((game: GameResult) => (
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
          {upcomingGames && (
            <>
              <h2>Upcoming Games</h2>
              <GamesStyling>
                {filterGames(upcomingGames).map((game: GameResult) => (
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
        </>
      ) : (
        <>
          {searchResults?.length ? (
            <>
              <h2>
                {formattedResult} results for "{searchedGameName}"
              </h2>
              <GamesStyling>
                {searchResults
                  ?.filter(
                    (game: GameResult) =>
                      !forbidden.some((word) =>
                        game.name.toLowerCase().includes(word)
                      )
                  )
                  .map((game: GameResult) => (
                    <Game
                      key={game.id}
                      name={game.name}
                      released={game.released}
                      image={game.background_image}
                      gameID={game.id}
                    />
                  ))}
              </GamesStyling>
              <Pagination />
            </>
          ) : (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
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

  @media (max-width: 576px) {
    padding: 0rem 1rem;
    h2 {
      font-size: 1.5rem;
      padding: 0 0 1.5rem 0;
    }
  }
`;

const GamesStyling = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-column-gap: 2rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 2rem;
  }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export default Games;
