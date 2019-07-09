import { Component, OnInit, OnDestroy } from '@angular/core';
import { LetttersService } from '../services/lettters.service';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  letters;

  constructor(
    private gameService: GameService,
    private letterService: LetttersService
  ) {
    this.subscription = this.gameService.sendGameStatus().subscribe(res => {
      if (res.status === 'gameOver') {
        for (const letter of this.letters) {
          letter.isUsed = true;
        }
      } else {
        for (const letter of this.letters) {
          letter.isUsed = false;
        }
      }
    });
  }

  clickLetter($event) {
    const letterIndex = $event.target.id;
    const letter = $event.target.value;

    this.letters[letterIndex].isUsed = true;
    this.gameService.clickLetter(letter);
  }

  ngOnInit() {
    this.letters = this.letterService.getLetters();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
