import { Injectable } from '@angular/core';

@Injectable()
export class WordService {
  private words: string[] = [
    'acres',
    'adult',
    'advice',
    'arrangement',
    'attempt',
    'august',
    'autumn',
    'border',
    'breeze',
    'brick',
    'calm',
    'canal',
    'casey',
    'cast',
    'chose',
    'claws',
    'coach',
    'letantly',
    'contrast',
    'cookies',
    'customs',
    'damage',
    'danny',
    'deeply',
    'depth',
    'discussion',
    'doll',
    'donkey',
    'egypt',
    'ellen',
    'essential',
    'exchange',
    'exist',
    'explanation',
    'facing',
    'film',
    'finest',
    'fireplace',
    'floating',
    'folks',
    'fort',
    'garage',
    'grabbed',
    'grandmother',
    'habit',
    'happily',
    'harry',
    'heading',
    'hunter',
    'illinois',
    'image',
    'independent',
    'instant',
    'january',
    'kids',
    'label',
    'lee',
    'lungs',
    'manufacturing',
    'martin',
    'mathematics',
    'melted',
    'memory',
    'mill',
    'mission',
    'monkey',
    'mount',
    'mysterious',
    'neighborhood',
    'norway',
    'nuts',
    'occasionally',
    'official',
    'ourselves',
    'palace',
    'pennsylvania',
    'philadelphia',
    'plates',
    'poetry',
    'policeman',
    'positive',
    'possibly',
    'practical',
    'pride',
    'promised',
    'recall',
    'relationship',
    'remarkable',
    'require',
    'rhyme',
    'rocky',
    'rubbed',
    'rush',
    'sale',
    'satellites',
    'satisfied',
    'scared',
    'selection',
    'shake',
    'shaking',
    'shallow',
    'shout',
    'silly',
    'simplest',
    'slight',
    'slip',
    'slope',
    'soap',
    'solar',
    'species',
    'spin',
    'stiff',
    'swung',
    'tales',
    'thumb',
    'tobacco',
    'toy',
    'trap',
    'treated',
    'tune',
    'university',
    'vapor',
    'vessels',
    'wealth',
    'wolf',
    'zoo'
  ];
  constructor() {}

  getWord() {
    const index = Math.floor(Math.random() * this.words.length);
    const element = this.words.splice(index, 1);

    return element[0];
  }
}
