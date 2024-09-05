import { createContext, useState, ReactNode, FC, useContext } from "react";
import axios from "axios";
import { searchGamesURL } from "../api/api";

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
}

interface SearchApiResponse {
  results: Game[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface GameSearchType {
  searchResults: Game[] | null;
  searchGames: (query: string, page?: number) => void;
  loadingSearch: boolean;
  searchError: Error | null;
  totalResults: number | null;
  nextPage: string | null;
  prevPage: string | null;
  setTextInput: (text: string) => void;
  textInput: string;
  setSearchedGameName: (text: string) => void;
  searchedGameName: string;
}

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
});

export const GameSearchProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState<Game[] | null>(null);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<Error | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>("");
  const [searchedGameName, setSearchedGameName] = useState<string>("");

  const searchGames = async (query: string, page: number = 1) => {
    setLoadingSearch(true);
    try {
      const response = await axios.get<SearchApiResponse>(
        searchGamesURL(query, page)
      );
      console.log("response", response);
      setSearchResults(response.data.results);
      setTotalResults(response.data.count);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
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
  };

  return (
    <GameSearchContext.Provider value={value}>
      {children}
    </GameSearchContext.Provider>
  );
};

export const useGameSearch = (): GameSearchType =>
  useContext(GameSearchContext);
