import { League } from '../../../types/league';

export interface FormData extends FormDataRule {
  name: string;
  manual: string;
}

export interface FormDataRule {
  playerCount: string;
  gameType: string;
  tanyao: boolean;
  back: boolean;
  dora: string;
  startPoint: string;
  returnPoint: string;
  umaArray: string[];
}

// Formから返却される型
export type LeagueFormData = Omit<League, 'id' | 'createdAt'>;
