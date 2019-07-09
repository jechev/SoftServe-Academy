import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit, OnDestroy {
  wordArr: any[];
  subscription: Subscription;
  gameSubscription: Subscription;

  constructor(private gameService: GameService) {
    this.subscription = this.gameService
      .takeClickedLetter()
      .subscribe(result => {
        const letter = result.letter;
        const indexes: [] = result.indexes;
        if (indexes) {
          this.showMatchedLetters(letter, indexes);
        }
        if (!this.wordArr.includes('_')) {
          this.gameService.takeGameStatus('finish');
        }
      });

    this.gameSubscription = this.gameService.sendGameStatus().subscribe(() => {
      this.wordArr = this.gameService.sendHiddenWord();
    });
  }

  ngOnInit() {
    this.wordArr = this.gameService.sendHiddenWord();
  }

  showMatchedLetters(lettter, indexes) {
    indexes.forEach(v => {
      this.wordArr[v] = lettter;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.gameSubscription.unsubscribe();
  }
}
