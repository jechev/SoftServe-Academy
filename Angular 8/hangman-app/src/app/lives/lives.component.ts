import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lives',
  templateUrl: './lives.component.html',
  styleUrls: ['./lives.component.scss']
})
export class LivesComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  lives = 10;
  constructor(private gameService: GameService) {
    this.subscription = this.gameService.sendLives().subscribe(result => {
      this.lives = result.lives;
      if (result.lives === 0) {
        this.gameService.takeGameStatus('gameOver');
      }
    });
  }

  ngOnInit() {}

  resetGame() {
    this.gameService.takeGameStatus('reset');
    this.lives = 10;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
