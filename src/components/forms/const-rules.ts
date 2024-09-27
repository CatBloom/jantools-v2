import { LeagueRuleFormData } from '../../types/league';

// 雀魂公式ルール
export const MahjongSoulRule: LeagueRuleFormData = {
  playerCount: '4',
  gameType: '半荘戦',
  tanyao: true,
  back: true,
  dora: '3',
  startPoint: '25000',
  returnPoint: '25000',
  umaArray: ['15', '5', '-5', '-15'],
};
// 天鳳公式ルール
export const TenhouRule: LeagueRuleFormData = {
  playerCount: '4',
  gameType: '半荘戦',
  tanyao: true,
  back: true,
  dora: '3',
  startPoint: '25000',
  returnPoint: '30000',
  umaArray: ['20', '10', '-10', '-20'],
};
// Mリーグ公式ルール
export const MLeagueRule: LeagueRuleFormData = {
  playerCount: '4',
  gameType: '半荘戦',
  tanyao: true,
  back: true,
  dora: '3',
  startPoint: '25000',
  returnPoint: '30000',
  umaArray: ['30', '10', '-10', '-30'],
};
