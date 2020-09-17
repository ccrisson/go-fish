import { Card } from './card';

export interface Player {
  hand: Card[];
  matches: Array<Card[]>;
}
