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
