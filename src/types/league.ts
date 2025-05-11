export interface League {
  id: string;
  createdAt: string;
  name: string;
  manual: string;
  password: string;
  rule: LeagueRule;
}

export interface LeagueRule {
  playerCount: number;
  gameType: string;
  tanyao: boolean;
  back: boolean;
  dora: number;
  startPoint: number;
  returnPoint: number;
  uma: number[];
}

export type ReqCreateLeague = Omit<League, 'id' | 'createdAt'>;

export type ResDeleteLeague = Pick<League, 'id'>;

// Formから返却される型
export type LeagueFormData = Omit<League, 'id' | 'createdAt'>;
