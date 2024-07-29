import { createContext, useState, useEffect, ReactNode, FC } from "react";
import axios from "axios";
import { getUpcomingGamesURL } from "../api";

export interface GameResult {
  slug: string;
  name: string;
  playtime: number;
  released: string;
  background_image: string;
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

export interface UpcomingGamesContextType {
  upcomingGames: ApiResponse | null;
  loading: boolean;
  error: Error | null;
}

const UpcomingGamesContext = createContext<UpcomingGamesContextType>({
  upcomingGames: null,
  loading: false,
  error: null,
});

const UpcomingGamesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [upcomingGames, setUpcomingGames] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      try {
        const response = await axios.get<ApiResponse>(getUpcomingGamesURL());
        setUpcomingGames(response.data);
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

    fetchUpcomingGames();
  }, []);

  const value: UpcomingGamesContextType = {
    upcomingGames,
    loading,
    error,
  };

  return (
    <UpcomingGamesContext.Provider value={value}>
      {children}
    </UpcomingGamesContext.Provider>
  );
};

export { UpcomingGamesProvider, UpcomingGamesContext };
