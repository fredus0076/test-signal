import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TranslocoHttpLoader } from './transloco-loader';

describe('TranslocoHttpLoader', () => {
  let loader: TranslocoHttpLoader;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), TranslocoHttpLoader],
    });

    loader = TestBed.inject(TranslocoHttpLoader);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request translation file for the given language', () => {
    let received: any;

    loader.getTranslation('fr').subscribe((value) => {
      received = value;
    });

    const req = httpMock.expectOne('/public/i18n/fr.json');
    expect(req.request.method).toBe('GET');

    req.flush({ hello: 'Bonjour' });

    expect(received).toEqual({ hello: 'Bonjour' });
  });
});
