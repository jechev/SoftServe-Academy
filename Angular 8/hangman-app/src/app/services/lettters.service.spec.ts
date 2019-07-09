/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LetttersService } from './lettters.service';

describe('Service: Lettters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LetttersService]
    });
  });

  it('should ...', inject([LetttersService], (service: LetttersService) => {
    expect(service).toBeTruthy();
  }));
});
