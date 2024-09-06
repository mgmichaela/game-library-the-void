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
import { NewGamesContextType, GameListApiResponse } from "../types/types";

const NewGamesContext = createContext<NewGamesContextType>({
  newGames: null,
  loadingNewGames: false,
  newGamesError: null,
});

export const NewGamesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [newGames, setNewGames] = useState<GameListApiResponse | null>(null);
  const [loadingNewGames, setLoadingNewGames] = useState<boolean>(true);
  const [newGamesError, setNewGamesError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNewGames = async () => {
      try {
        const response = await axios.get<GameListApiResponse>(getNewGamesURL());
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

  const value: NewGamesContextType = {
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

export const useNewGamesContext = (): NewGamesContextType =>
  useContext(NewGamesContext);
