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

export type GameFormData = Pick<Game, 'results'>;
export interface GameResultTotal {
  rank: number;
  name: string;
  gameCount: number;
  totalPoint: number;
  averageRank: number;
}
