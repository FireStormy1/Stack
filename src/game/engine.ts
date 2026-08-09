export type GameMode = 'relaxed' | 'competitive';

export type StackBlock = {
  x: number;
  y: number;
  width: number;
  color: string;
};

export const BLOCK_HEIGHT = 22;
export const PERFECT_TOLERANCE = 7;

export const BLOCK_COLORS = [
  '#f3bd83',
  '#eea178',
  '#dd826e',
  '#c9685c',
  '#b65b58',
  '#8f5658',
  '#dbad76',
  '#e5c18a',
];

export function pointsForScore(score: number): number {
  if (score < 100) return 1;
  if (score < 250) return 2;
  if (score < 500) return 3;
  if (score < 750) return 4;
  if (score < 1000) return 5;
  return 6;
}

export function speedForScore(score: number, mode: GameMode): number {
  const interval = mode === 'relaxed' ? 50 : 40;
  const steps = Math.floor(score / interval);
  return 0.16 + Math.min(steps * 0.012, 0.22);
}

export function isPerfect(active: StackBlock, top: StackBlock): boolean {
  const activeCenter = active.x + active.width / 2;
  const topCenter = top.x + top.width / 2;
  return Math.abs(activeCenter - topCenter) <= PERFECT_TOLERANCE;
}

export function streakBonus(streak: number): number {
  return streak > 0 && streak % 10 === 0 ? 5 * Math.floor(streak / 10) : 0;
}
