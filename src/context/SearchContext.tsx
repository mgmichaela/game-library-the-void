import { createContext, useState, ReactNode, FC, useContext } from "react";
import axios from "axios";
import { searchGamesURL } from "../api/api";
import {
  GameSearchType,
  GameResult,
  GameListApiResponse,
} from "../types/types";

const GameSearchContext = createContext<GameSearchType>({
  searchResults: null,
  searchGames: () => {},
  loadingSearch: false,
  searchError: null,
  totalResults: null,
  nextPage: null,
  prevPage: null,
  setTextInput: () => {},
  textInput: "",
  setSearchedGameName: () => {},
  searchedGameName: "",
  currentPage: 1,
});

export const GameSearchProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState<GameResult[] | null>(null);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<Error | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [searchedGameName, setSearchedGameName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const searchGames = async (query: string, page: number = 1) => {
    setLoadingSearch(true);
    try {
      const response = await axios.get<GameListApiResponse>(
        searchGamesURL(query, page)
      );
      setSearchResults(response.data.results);
      setTotalResults(response.data.count);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setCurrentPage(page);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setSearchError(err);
      } else {
        setSearchError(new Error("An unexpected error occurred"));
      }
    } finally {
      setLoadingSearch(false);
    }
  };

  const value: GameSearchType = {
    searchResults,
    searchGames,
    loadingSearch,
    searchError,
    totalResults,
    nextPage,
    prevPage,
    textInput,
    setTextInput,
    searchedGameName,
    setSearchedGameName,
    currentPage,
  };

  return (
    <GameSearchContext.Provider value={value}>
      {children}
    </GameSearchContext.Provider>
  );
};

export const useGameSearch = (): GameSearchType =>
  useContext(GameSearchContext);
