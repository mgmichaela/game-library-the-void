import { createContext, useState, ReactNode, FC, useContext } from "react";
import axios from "axios";
import { gameScreenshotsURL } from "../api/api";

interface ApiResponse {
  results: {
    height: number;
    width: number;
    id: number;
    image: string;
  }[];
}

export interface GameScreenshotsType {
  gameScreenshots: ApiResponse | null;
  fetchGameScreenshots: (gameID: number) => void;
  loadingGameScreenshots: boolean;
  gameScreenshotsError: Error | null;
}

const GameScreenshotsContext = createContext<GameScreenshotsType>({
  gameScreenshots: null,
  fetchGameScreenshots: () => {},
  loadingGameScreenshots: false,
  gameScreenshotsError: null,
});

export const GameScreenshotsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [gameScreenshots, setGameScreenshots] = useState<ApiResponse | null>(
    null
  );
  const [loadingGameScreenshots, setLoadingGameScreenshots] =
    useState<boolean>(true);
  const [gameScreenshotsError, setGameScreenshotsError] =
    useState<Error | null>(null);

  const fetchGameScreenshots = async (gameID: number) => {
    try {
      const response = await axios.get<ApiResponse>(gameScreenshotsURL(gameID));
      setGameScreenshots(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setGameScreenshotsError(err);
      } else {
        setGameScreenshotsError(new Error("Failed to load game screenshots."));
      }
    } finally {
      setLoadingGameScreenshots(false);
    }
  };

  const value: GameScreenshotsType = {
    gameScreenshots,
    fetchGameScreenshots,
    loadingGameScreenshots,
    gameScreenshotsError,
  };

  return (
    <GameScreenshotsContext.Provider value={value}>
      {children}
    </GameScreenshotsContext.Provider>
  );
};

export const useGameScreenshots = (): GameScreenshotsType =>
  useContext(GameScreenshotsContext);
