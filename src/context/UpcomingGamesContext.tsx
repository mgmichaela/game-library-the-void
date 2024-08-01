import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  useContext,
} from "react";
import axios from "axios";
import { getUpcomingGamesURL } from "../api";

export interface GameResult {
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

export interface UpcomingGamesContextType {
  upcomingGames: ApiResponse | null;
  loadingUpcomingGames: boolean;
  upcomingGamesError: Error | null;
}

const UpcomingGamesContext = createContext<UpcomingGamesContextType>({
  upcomingGames: null,
  loadingUpcomingGames: false,
  upcomingGamesError: null,
});

export const UpcomingGamesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [upcomingGames, setUpcomingGames] = useState<ApiResponse | null>(null);
  const [loadingUpcomingGames, setLoadingUpcomingGames] =
    useState<boolean>(true);
  const [upcomingGamesError, setUpcomingGamesError] = useState<Error | null>(
    null
  );

  useEffect(() => {
    const fetchUpcomingGames = async () => {
      try {
        const response = await axios.get<ApiResponse>(getUpcomingGamesURL());
        setUpcomingGames(response.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setUpcomingGamesError(err);
        } else {
          setUpcomingGamesError(
            new Error(
              "Failed to load upcoming games. Please try refreshing the page."
            )
          );
        }
      } finally {
        setLoadingUpcomingGames(false);
      }
    };

    fetchUpcomingGames();
  }, []);

  const value: UpcomingGamesContextType = {
    upcomingGames,
    loadingUpcomingGames,
    upcomingGamesError,
  };

  return (
    <UpcomingGamesContext.Provider value={value}>
      {children}
    </UpcomingGamesContext.Provider>
  );
};

export const useUpcomingGamesContext = (): UpcomingGamesContextType =>
  useContext(UpcomingGamesContext);
