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

export type ReqCreateGame = Omit<Game, 'id' | 'createdAt'>;

export type ResDeleteGame = Pick<Game, 'id'>;
// Formから返却される型
export type GameFormData = Omit<Game, 'id' | 'createdAt' | 'leagueID'>;

export interface GameResultTotal {
  rank: number;
  name: string;
  gameCount: number;
  totalPoint: number;
  averageRank: number;
}
