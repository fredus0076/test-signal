/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecureService } from './secure.service';

describe('Service: Secure', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureService]
    });
  });

  it('should ...', inject([SecureService], (service: SecureService) => {
    expect(service).toBeTruthy();
  }));
});
