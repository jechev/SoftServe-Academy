import { Injectable } from '@angular/core';

@Injectable()
export class LetttersService {
  private letters = [
    { value: 'a', isUsed: false },
    { value: 'b', isUsed: false },
    { value: 'c', isUsed: false },
    { value: 'd', isUsed: false },
    { value: 'e', isUsed: false },
    { value: 'f', isUsed: false },
    { value: 'g', isUsed: false },
    { value: 'h', isUsed: false },
    { value: 'i', isUsed: false },
    { value: 'j', isUsed: false },
    { value: 'k', isUsed: false },
    { value: 'l', isUsed: false },
    { value: 'm', isUsed: false },
    { value: 'n', isUsed: false },
    { value: 'o', isUsed: false },
    { value: 'p', isUsed: false },
    { value: 'q', isUsed: false },
    { value: 'r', isUsed: false },
    { value: 's', isUsed: false },
    { value: 't', isUsed: false },
    { value: 'u', isUsed: false },
    { value: 'v', isUsed: false },
    { value: 'w', isUsed: false },
    { value: 'x', isUsed: false },
    { value: 'y', isUsed: false },
    { value: 'z', isUsed: false }
  ];

  getLetters() {
    return this.letters;
  }
}
