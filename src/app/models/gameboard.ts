import { Player } from './player';
import { Card } from './card';

export interface Gameboard {
  player1: Player;
  player2: Player;
  deck: Card[];
}
