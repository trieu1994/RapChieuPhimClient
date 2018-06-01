import { TestBed, inject } from '@angular/core/testing';

import { DateshowService } from './dateshow.service';

describe('DateshowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateshowService]
    });
  });

  it('should be created', inject([DateshowService], (service: DateshowService) => {
    expect(service).toBeTruthy();
  }));
});
