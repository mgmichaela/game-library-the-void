import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  useContext,
} from "react";
import axios from "axios";
import { getNewGamesURL } from "../api/api";

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

export interface NexGamesContextType {
  newGames: ApiResponse | null;
  loadingNewGames: boolean;
  newGamesError: Error | null;
}

const NewGamesContext = createContext<NexGamesContextType>({
  newGames: null,
  loadingNewGames: false,
  newGamesError: null,
});

export const NewGamesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [newGames, setNewGames] = useState<ApiResponse | null>(null);
  const [loadingNewGames, setLoadingNewGames] = useState<boolean>(true);
  const [newGamesError, setNewGamesError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNewGames = async () => {
      try {
        const response = await axios.get<ApiResponse>(getNewGamesURL());
        setNewGames(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setNewGamesError(err);
        } else {
          setNewGamesError(
            new Error(
              "Failed to load new games. Please try refreshing the page."
            )
          );
        }
      } finally {
        setLoadingNewGames(false);
      }
    };

    fetchNewGames();
  }, []);

  const value: NexGamesContextType = {
    newGames,
    loadingNewGames,
    newGamesError,
  };

  return (
    <NewGamesContext.Provider value={value}>
      {children}
    </NewGamesContext.Provider>
  );
};

export const useNewGamesContext = (): NexGamesContextType =>
  useContext(NewGamesContext);
