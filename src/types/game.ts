export interface Game {
  id: string;
  leagueID: string;
  createdAt: string;
  results: GameResult[];
}

export interface GameResult {
  rank: number;
  name: string;
  point: number;
  calcPoint: number;
}

export type ReqCreateGame = Pick<Game, 'results'>;

export type ResDeleteGame = Pick<Game, 'id'>;

export interface GameResultTotal {
  rank: number;
  name: string;
  gameCount: number;
  totalPoint: number;
  averageRank: number;
}

// Formから返却される型
export type GameFormData = Pick<Game, 'results'>;
