export interface Game {
  id: string;
  createdAt: Date;
  results: GameResult[];
}

export interface GameResult {
  rank: number;
  name: string;
  point: number;
  calcPoint: number;
}

export interface GameResultTotal {
  rank: number;
  name: string;
  gameCount: number;
  totalPoint: number;
  averageRank: number;
}
