export interface League {
  id?: string;
  createdAt?: string;
  name: string;
  manual: string;
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

export interface LeagueFormData extends LeagueRuleFormData {
  name: string;
  manual: string;
}

export interface LeagueRuleFormData {
  playerCount: string;
  gameType: string;
  tanyao: boolean;
  back: boolean;
  dora: string;
  startPoint: string;
  returnPoint: string;
  umaArray: string[];
}
