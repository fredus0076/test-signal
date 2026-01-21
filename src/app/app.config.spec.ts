import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appConfig } from './app.config';
import { environmentToken } from '@core/environment/environmentToken';

describe('appConfig', () => {
  it('should wire GlobalErrorInterceptor via DI (snackbar on 5xx)', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    const snackBarMock = { open: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        // On réutilise la config réelle (wiring) et on substitue uniquement les dépendances externes.
        ...(appConfig.providers ?? []),
        provideHttpClientTesting(),
        {
          provide: MatSnackBar,
          useValue: snackBarMock,
        },
        // Rend le test déterministe et évite toute dépendance aux fichiers d’environnements.
        {
          provide: environmentToken,
          useValue: {
            api_error: 'https://example.test/',
            fake_api: 'https://example.test/',
          },
        },
      ],
    });

    const http = TestBed.inject(HttpClient);
    const httpMock = TestBed.inject(HttpTestingController);

    http.get('/api/test').subscribe({
      next: () => {
        throw new Error('Unexpected success');
      },
      error: () => {},
    });

    const req = httpMock.expectOne('/api/test');
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });

    expect(snackBarMock.open).toHaveBeenCalledWith(
      'boom',
      'Fermer',
      expect.objectContaining({
        duration: 8000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'error-snackbar',
      })
    );

    httpMock.verify();

    jest.restoreAllMocks();
  });
});
