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

interface GameResult {
  slug: string;
  name: string;
  playtime: number;
  released: string;
  background_image: string;
  id: number;
  platforms: {
    name: string;
    slug: string;
  };
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GameResult[];
}

export interface PopularGamesContextType {
  popularGames: ApiResponse | null;
  loadingPopularGames: boolean;
  popularGamesError: Error | null;
}

const PopularGamesContext = createContext<PopularGamesContextType>({
  popularGames: null,
  loadingPopularGames: false,
  popularGamesError: null,
});

export const PopularGamesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [popularGames, setPopularGames] = useState<ApiResponse | null>(null);
  const [loadingPopularGames, setLoadingPopularGames] = useState<boolean>(true);
  const [popularGamesError, setPopularGamesError] = useState<Error | null>(
    null
  );

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await axios.get<ApiResponse>(getPopularGamesURL());
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
