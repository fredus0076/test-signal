import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { userResolver } from './user-resolver';
import { environmentToken } from '@core/environment/environmentToken';

describe('userResolver', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: environmentToken,
          useValue: {
            fake_api: 'https://example.test/',
          },
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    jest.restoreAllMocks();
  });

  it('should request the user endpoint and emit the response after the configured delay', fakeAsync(() => {
    let received: any;

    TestBed.runInInjectionContext(() => {
      userResolver({} as any, {} as any).subscribe((value) => {
        received = value;
      });
    });

    const req = httpMock.expectOne('https://example.test/users/1');
    expect(req.request.method).toBe('GET');

    req.flush({ id: 1, name: 'Ada' });

    // Avant le tick, rien ne doit être émis (delay(1500)).
    expect(received).toBeUndefined();

    tick(1500);

    expect(received).toEqual({ id: 1, name: 'Ada' });
    expect(console.log).toHaveBeenCalledWith({ id: 1, name: 'Ada' });
  }));

  it('should emit null on HTTP error (catchError branch)', fakeAsync(() => {
    let received: any;

    TestBed.runInInjectionContext(() => {
      userResolver({} as any, {} as any).subscribe((value) => {
        received = value;
      });
    });

    const req = httpMock.expectOne('https://example.test/users/1');
    req.flush('Boom', { status: 500, statusText: 'Server Error' });

    tick(1500);

    expect(received).toBeNull();
  }));
});
