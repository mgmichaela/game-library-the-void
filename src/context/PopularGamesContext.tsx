import { createContext, useState, useEffect, ReactNode, FC } from "react";
import axios from "axios";
import { getPopularGamesURL } from "../api";

interface GameResult {
  slug: string;
  name: string;
  playtime: number;
  platforms: {
    id: number;
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
  loading: boolean;
  error: Error | null;
}

const PopularGamesContext = createContext<PopularGamesContextType>({
  popularGames: null,
  loading: false,
  error: null,
});

const PopularGamesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [popularGames, setPopularGames] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPopularGames = async () => {
      try {
        const response = await axios.get<ApiResponse>(getPopularGamesURL());
        setPopularGames(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        } else {
          setError(new Error("An unexpected error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPopularGames();
  }, []);

  const value: PopularGamesContextType = {
    popularGames,
    loading,
    error,
  };

  return (
    <PopularGamesContext.Provider value={value}>
      {children}
    </PopularGamesContext.Provider>
  );
};

export { PopularGamesProvider, PopularGamesContext };
