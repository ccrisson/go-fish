import { Injectable } from '@angular/core';

import { Gameboard } from './models/gameboard';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamecontrollerService {

  private gameListener = new Subject<JSON>();
  response;
  constructor(private http: HttpClient) { }

  getGameListener(): Observable<JSON> {
    return this.gameListener.asObservable();
  }

  newGame(): void {
    this.http.get('http://localhost:3000/newgame').subscribe(req => {
      this.response = req;
      this.gameListener.next(this.response);
    });

  }

  drawCard(gamestate, player): void {
    this.http.post('http://localhost:3000/drawcard/' + player, gamestate)
      .subscribe(req => {
        this.response = req;
        this.gameListener.next(this.response);
      });
  }

  requestCard(gamestate, rank, player): void {
    this.http.post(`http://localhost:3000/requestcard/${rank}/player/${player}`, gamestate).subscribe(req => {
      this.response = req;
      this.gameListener.next(this.response);
    });
  }
  // return this.http.post<JSON>('http://localhost:3000/drawcard/' + player, gamestate).subscribe(req => {
  //   this.response = req;
  //   this.gameListener.next(this.response);
  // });

}
