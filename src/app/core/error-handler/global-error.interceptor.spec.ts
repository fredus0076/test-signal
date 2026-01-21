import { TestBed } from '@angular/core/testing';
import {
  HttpContext,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, firstValueFrom, of, throwError } from 'rxjs';
import { GlobalErrorInterceptor } from './global-error.interceptor';
import { SKIP_GLOBAL_SNACKBAR } from './http-context-tokens';

describe('GlobalErrorInterceptor', () => {
  let interceptor: GlobalErrorInterceptor;
  let snackBarMock: { open: jest.Mock };

  beforeEach(() => {
    snackBarMock = {
      open: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GlobalErrorInterceptor,
        {
          provide: MatSnackBar,
          useValue: snackBarMock,
        },
      ],
    });

    interceptor = TestBed.inject(GlobalErrorInterceptor);
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should show snackbar for server errors (>= 500) when not skipped', async () => {
    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Server Error',
      url: '/api/test',
      error: { message: 'boom' },
    });

    const req = new HttpRequest('GET', '/api/test', null);
    const handler: HttpHandler = {
      handle: () => throwError(() => error),
    };

    await firstValueFrom(
      interceptor.intercept(req, handler).pipe(
        catchError((err) => {
          expect(err).toBe(error);
          return of(null as any);
        })
      )
    );

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
  });

  it('should not show snackbar for client errors (< 500)', async () => {
    const error = new HttpErrorResponse({
      status: 400,
      statusText: 'Bad Request',
      url: '/api/test',
    });

    const req = new HttpRequest('GET', '/api/test', null);
    const handler: HttpHandler = {
      handle: () => throwError(() => error),
    };

    await firstValueFrom(
      interceptor.intercept(req, handler).pipe(
        catchError((err) => {
          expect(err).toBe(error);
          return of(null as any);
        })
      )
    );

    expect(snackBarMock.open).not.toHaveBeenCalled();
  });

  it('should not show snackbar when SKIP_GLOBAL_SNACKBAR is enabled', async () => {
    const error = new HttpErrorResponse({
      status: 503,
      statusText: 'Service Unavailable',
      url: '/api/test',
    });

    const context = new HttpContext().set(SKIP_GLOBAL_SNACKBAR, true);
    const req = new HttpRequest('GET', '/api/test', null, { context });
    const handler: HttpHandler = {
      handle: () => throwError(() => error),
    };

    await firstValueFrom(
      interceptor.intercept(req, handler).pipe(
        catchError((err) => {
          expect(err).toBe(error);
          return of(null as any);
        })
      )
    );

    expect(snackBarMock.open).not.toHaveBeenCalled();
  });

  it('should use default message mapping when no message is provided', async () => {
    // HttpErrorResponse renseigne presque toujours `message`.
    // Pour tester la branche "mapping par status" (fallback), on simule une erreur sans `message`.
    const error = {
      status: 503,
      statusText: 'Service Unavailable',
      url: '/api/test',
      message: undefined,
      error: undefined,
    } as unknown as HttpErrorResponse;

    const req = new HttpRequest('GET', '/api/test', null);
    const handler: HttpHandler = {
      handle: () => throwError(() => error),
    };

    await firstValueFrom(
      interceptor.intercept(req, handler).pipe(
        catchError((err) => {
          expect(err).toBe(error);
          return of(null as any);
        })
      )
    );

    expect(snackBarMock.open).toHaveBeenCalledWith(
      'Service temporairement indisponible.',
      'Fermer',
      expect.any(Object)
    );
  });

  it('should fallback to a generic message for unknown server status when no message is provided', async () => {
    const error = {
      status: 599,
      statusText: 'Network Connect Timeout Error',
      url: '/api/test',
      message: undefined,
      error: undefined,
    } as unknown as HttpErrorResponse;

    const req = new HttpRequest('GET', '/api/test', null);
    const handler: HttpHandler = {
      handle: () => throwError(() => error),
    };

    await firstValueFrom(
      interceptor.intercept(req, handler).pipe(
        catchError((err) => {
          expect(err).toBe(error);
          return of(null as any);
        })
      )
    );

    expect(snackBarMock.open).toHaveBeenCalledWith(
      'Erreur serveur (599). Veuillez réessayer plus tard.',
      'Fermer',
      expect.any(Object)
    );
  });

  it('should fallback to HttpErrorResponse.message when there is no error payload message', async () => {
    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Server Error',
      url: '/api/test',
      error: undefined,
    });

    const req = new HttpRequest('GET', '/api/test', null);
    const handler: HttpHandler = {
      handle: () => throwError(() => error),
    };

    await firstValueFrom(
      interceptor.intercept(req, handler).pipe(
        catchError((err) => {
          expect(err).toBe(error);
          return of(null as any);
        })
      )
    );

    // Le message Angular peut varier, on vérifie une propriété stable.
    expect(snackBarMock.open).toHaveBeenCalledWith(
      expect.stringContaining('500'),
      'Fermer',
      expect.any(Object)
    );
  });
});
