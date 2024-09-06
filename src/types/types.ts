export interface Platform {
  id: number;
  name: string;
}

export interface GameDetailsApiResponse {
  name: string;
  rating: number;
  description_raw: string;
  background_image: string;
  platforms: { platform: Platform }[];
}

export interface GameDetailsType {
  gameDetails: GameDetailsApiResponse | null;
  fetchGameDetails: (gameID: number) => void;
  loadingGameDetails: boolean;
  gameDetailsError: Error | null;
  currentGameID: number | null;
}

export interface GameScreenshotsApiResponse {
  results: {
    height: number;
    width: number;
    id: number;
    image: string;
  }[];
}

export interface GameScreenshotsType {
  gameScreenshots: GameScreenshotsApiResponse | null;
  fetchGameScreenshots: (gameID: number) => void;
  loadingGameScreenshots: boolean;
  gameScreenshotsError: Error | null;
}

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

export interface GameListApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GameResult[];
}

export interface PopularGamesContextType {
  popularGames: GameListApiResponse | null;
  loadingPopularGames: boolean;
  popularGamesError: Error | null;
}

export interface NewGamesContextType {
  newGames: GameListApiResponse | null;
  loadingNewGames: boolean;
  newGamesError: Error | null;
}

export interface UpcomingGamesContextType {
  upcomingGames: GameListApiResponse | null;
  loadingUpcomingGames: boolean;
  upcomingGamesError: Error | null;
}

export interface GameSearchType {
  searchResults: GameResult[] | null;
  searchGames: (query: string, page?: number) => void;
  loadingSearch: boolean;
  searchError: Error | null;
  totalResults: number | null;
  nextPage: string | null;
  prevPage: string | null;
  setTextInput: (text: string) => void;
  textInput: string;
  setSearchedGameName: (text: string) => void;
  searchedGameName: string;
}
