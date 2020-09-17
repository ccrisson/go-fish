import { Component, OnInit } from '@angular/core';
import { Gameboard } from '../models/gameboard';
import { GamecontrollerService } from '../gamecontroller.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  gameboard;
  turn = 'player1';
  constructor(private gameController: GamecontrollerService) { }

  ngOnInit(): void {
    this.gameController.getGameListener().subscribe((gameboard) => this.gameboard = gameboard);
    this.gameController.newGame();
    console.log('game-board component ngoninit');
  }

  requestCardTest(rank: string, player: string): void {
    console.log(`${rank} ${player}`);
    this.gameController.requestCard(this.gameboard, rank, player);
  }

  drawCardTest(): void {
    this.gameController.drawCard(this.gameboard, 'player1');
  }

}
