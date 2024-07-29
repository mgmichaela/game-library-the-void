import { createContext, useState, useEffect, ReactNode, FC } from "react";
import axios from "axios";
import { getUpcomingGamesURL as getNewGamesURL } from "../api";

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

export interface NexGamesContextType {
  newGames: ApiResponse | null;
  loading: boolean;
  error: Error | null;
}

const NewGamesContext = createContext<NexGamesContextType>({
  newGames: null,
  loading: false,
  error: null,
});

const NewGamesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [newGames, setNewGames] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNewGames = async () => {
      try {
        const response = await axios.get<ApiResponse>(getNewGamesURL());
        setNewGames(response.data);
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

    fetchNewGames();
  }, []);

  const value: NexGamesContextType = {
    newGames,
    loading,
    error,
  };

  return (
    <NewGamesContext.Provider value={value}>
      {children}
    </NewGamesContext.Provider>
  );
};

export { NewGamesProvider, NewGamesContext };
