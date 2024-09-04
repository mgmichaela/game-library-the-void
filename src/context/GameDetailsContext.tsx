import { createContext, useState, ReactNode, FC, useContext } from "react";
import axios from "axios";
import { gameDetailsURL } from "../api/api";

interface Platform {
  id: number;
  name: string;
}

interface ApiResponse {
  name: string;
  rating: number;
  description_raw: string;
  background_image: string;
  platforms: { platform: Platform }[];
}

export interface GameDetailsType {
  gameDetails: ApiResponse | null;
  fetchGameDetails: (gameID: number) => void;
  loadingGameDetails: boolean;
  gameDetailsError: Error | null;
  currentGameID: number | null;
}

const GameDetailsContext = createContext<GameDetailsType>({
  gameDetails: null,
  fetchGameDetails: () => {},
  loadingGameDetails: false,
  gameDetailsError: null,
  currentGameID: null,
});

export const GameDetailsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameDetails, setGameDetails] = useState<ApiResponse | null>(null);
  const [loadingGameDetails, setLoadingGameDetails] = useState<boolean>(false);
  const [gameDetailsError, setGameDetailsError] = useState<Error | null>(null);
  const [currentGameID, setCurrentGameID] = useState<number | null>(null);

  const fetchGameDetails = async (gameID: number) => {
    setLoadingGameDetails(true);
    try {
      const response = await axios.get<ApiResponse>(gameDetailsURL(gameID));
      setCurrentGameID(gameID);
      setGameDetails(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setGameDetailsError(err);
      } else {
        setGameDetailsError(new Error("An unexpected error occurred"));
      }
    } finally {
      setLoadingGameDetails(false);
    }
  };

  const value: GameDetailsType = {
    gameDetails,
    fetchGameDetails,
    loadingGameDetails,
    gameDetailsError,
    currentGameID,
  };

  return (
    <GameDetailsContext.Provider value={value}>
      {children}
    </GameDetailsContext.Provider>
  );
};

export const useGameDetails = (): GameDetailsType =>
  useContext(GameDetailsContext);
