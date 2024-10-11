export interface Game {
  id?: string;
  leagueID: string;
  createdAt: Date;
  results: GameResult[];
}

export interface GameResult {
  rank: number;
  name: string;
  point: number;
  calcPoint: number;
}

export interface GameID {
  id: string;
}

export interface GameResultTotal {
  rank: number;
  name: string;
  gameCount: number;
  totalPoint: number;
  averageRank: number;
}
