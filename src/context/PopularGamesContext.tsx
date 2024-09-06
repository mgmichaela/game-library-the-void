import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  useContext,
} from "react";
import axios from "axios";
import { getPopularGamesURL } from "../api/api";
import { PopularGamesContextType, GameListApiResponse } from "../types/types";

const PopularGamesContext = createContext<PopularGamesContextType>({
  popularGames: null,
  loadingPopularGames: false,
  popularGamesError: null,
});

export const PopularGamesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [popularGames, setPopularGames] = useState<GameListApiResponse | null>(
    null
  );
  const [loadingPopularGames, setLoadingPopularGames] = useState<boolean>(true);
  const [popularGamesError, setPopularGamesError] = useState<Error | null>(
    null
  );

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await axios.get<GameListApiResponse>(
          getPopularGamesURL()
        );
        setPopularGames(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setPopularGamesError(err);
        } else {
          setPopularGamesError(
            new Error(
              "Failed to load popular games. Please try refreshing the page."
            )
          );
        }
      } finally {
        setLoadingPopularGames(false);
      }
    };

    fetchPopularGames();
  }, []);

  const value: PopularGamesContextType = {
    popularGames,
    loadingPopularGames,
    popularGamesError,
  };

  return (
    <PopularGamesContext.Provider value={value}>
      {children}
    </PopularGamesContext.Provider>
  );
};

export const usePopularGamesContext = (): PopularGamesContextType =>
  useContext(PopularGamesContext);
