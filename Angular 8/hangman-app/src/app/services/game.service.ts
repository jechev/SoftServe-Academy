import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WordService } from './word.service';

@Injectable()
export class GameService {
  constructor(private wordService: WordService) {}
  private subject = new Subject<any>();
  private livesSubject = new Subject<any>();
  private gameStatus = new Subject<any>();
  private word = this.wordService.getWord();
  private canvasStep = 0;
  private lives = 10;

  // Call this metohd in letters component
  clickLetter(letter: string) {
    if (this.getAllIndexes(this.word, letter).length > 0) {
      this.subject.next({
        letter,
        indexes: this.getAllIndexes(this.word, letter)
      });
    } else {
      this.subject.next({
        step: this.canvasStep
      });
      this.canvasStep += 1;
      this.lives -= 1;
      this.takeLives();
    }
  }

  // The components send game status
  takeGameStatus(stat) {
    if (stat === 'reset') {
      this.lives = 10;
      this.canvasStep = 0;
    }
    if (stat !== 'gameOver') {
      this.word = this.wordService.getWord();
    }

    this.gameStatus.next({ status: stat });
  }
  // The service sends a game status to other components
  sendGameStatus(): Observable<any> {
    return this.gameStatus.asObservable();
  }
  // Take the current lives
  takeLives() {
    this.livesSubject.next({ lives: this.lives });
  }

  // the service sends a lives count to lives component
  sendLives(): Observable<any> {
    return this.livesSubject.asObservable();
  }
  // the service send clicked letter to word component
  takeClickedLetter(): Observable<any> {
    return this.subject.asObservable();
  }
  // the service send a word's length to word component
  sendHiddenWord() {
    console.log(this.word);
    const arr = this.createArr(this.word.length);
    return arr;
  }

  private getAllIndexes(arr, val) {
    const indexes = [];
    let i = -1;
    // tslint:disable-next-line: no-conditional-assignment
    while ((i = arr.indexOf(val, i + 1)) !== -1) {
      indexes.push(i);
    }
    return indexes;
  }

  private createArr(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push('_');
    }
    return arr;
  }
}
