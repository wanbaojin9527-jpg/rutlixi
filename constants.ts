
import { Prize } from './types';
import { APP_CONFIG } from './appConfig';

export const PRIZES: Prize[] = APP_CONFIG.prizes;

export const COLORS = {
  concung: APP_CONFIG.brand.primaryColor,
  gold: "#ffd700",
  lixiRed: APP_CONFIG.envelope.backColor,
  lightGold: "#fff9c4"
};

export const getPrizeImage = (name: string): string | undefined => {
  return PRIZES.find(p => p.name === name)?.imageUrl;
};
