import { Game } from '../../../types/game';

export interface FormData {
  gameArray: FormDataGameResult[];
}

export interface FormDataGameResult {
  rank: string;
  name: string;
  point: string;
  calcPoint: string;
}

// Formから返却される型
export type GameFormData = Omit<Game, 'id' | 'createdAt' | 'leagueID'>;
