import { usePopularGamesContext } from "../context/PopularGamesContext";
import Game from "../components/Game";
import Loader from "../components/Loader";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useUpcomingGamesContext } from "../context/UpcomingGamesContext";
import { useGameSearch } from "../context/SearchContext";
import { GameListApiResponse, GameResult } from "../types/types";
import { fadeIn } from "../animations/animation";
import NotAllowed from "./NotAllowed";
import { FC } from "react";
import Pagination from "./Pagination";

interface GamesProps {
  showDefaultGames: boolean;
}

const forbiddenWords = process.env.REACT_APP_FORBIDDEN_WORDS
  ? process.env.REACT_APP_FORBIDDEN_WORDS.split(",")
  : [];

const Games: FC<GamesProps> = ({ showDefaultGames }) => {
  const { popularGames, loadingPopularGames, popularGamesError } =
    usePopularGamesContext();
  const { upcomingGames, loadingUpcomingGames, upcomingGamesError } =
    useUpcomingGamesContext();
  const { searchResults, totalResults, searchedGameName, loadingSearch } =
    useGameSearch();

  if (loadingPopularGames || loadingUpcomingGames || loadingSearch) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  if (popularGamesError) return <p>Error: {popularGamesError.message}</p>;
  if (upcomingGamesError) return <p>Error: {upcomingGamesError.message}</p>;

  const formattedResult = new Intl.NumberFormat("en-US").format(
    totalResults as number
  );

  const filterGames = (games: GameListApiResponse): GameResult[] =>
    games.results.filter(
      (game: GameResult) =>
        !forbiddenWords.some((word) => game.name.toLowerCase().includes(word))
    );

  const containsForbiddenWord = (name: string) =>
    forbiddenWords.some((word) => name.toLowerCase().includes(word));

  return (
    <GameWrapper initial="hidden" animate="show" variants={fadeIn}>
      {showDefaultGames ? (
        <>
          {popularGames && (
            <>
              <SectionTitle>Popular Games</SectionTitle>
              <GamesGrid>
                {filterGames(popularGames).map((game: GameResult) => (
                  <Game
                    key={game.id}
                    name={game.name}
                    released={game.released}
                    image={game.background_image}
                    gameID={game.id}
                  />
                ))}
              </GamesGrid>
            </>
          )}
          {upcomingGames && (
            <>
              <SectionTitle>Upcoming Games</SectionTitle>
              <GamesGrid>
                {filterGames(upcomingGames).map((game: GameResult) => (
                  <Game
                    key={game.id}
                    name={game.name}
                    released={game.released}
                    image={game.background_image}
                    gameID={game.id}
                  />
                ))}
              </GamesGrid>
            </>
          )}
        </>
      ) : containsForbiddenWord(searchedGameName) ? (
        <NotAllowed />
      ) : searchResults && searchResults.length > 0 ? (
        <>
          <SectionWrapper
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <SectionTitle>
              {formattedResult} results for "{searchedGameName}"
            </SectionTitle>
            <div>
              <Pagination />
            </div>
          </SectionWrapper>
          <GamesGrid>
            {searchResults.map((game: GameResult) => (
              <Game
                key={game.id}
                name={game.name}
                released={game.released}
                image={game.background_image}
                gameID={game.id}
              />
            ))}
          </GamesGrid>
        </>
      ) : (
        <p>No games found for "{searchedGameName}".</p>
      )}
    </GameWrapper>
  );
};

const GameWrapper = styled(motion.div)`
  padding: 0rem 5rem;

  @media (max-width: 576px) {
    padding: 0rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  padding: 5rem 0rem;

  @media (max-width: 576px) {
    font-size: 1.5rem;
    padding: 0 0 1.5rem 0;
  }
`;

const GamesGrid = styled(motion.div)`
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

const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Games;
