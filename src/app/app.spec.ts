import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideTransloco, TranslocoLoader, Translation } from '@jsverse/transloco';
import { of } from 'rxjs';
import { App } from './app';
import { environmentToken } from '@core/environment/environmentToken';
import { SecureService } from '@core/auth/secure.service';

class TranslocoTestingLoader implements TranslocoLoader {
  getTranslation(_lang: string) {
    return of({ hello: 'Hello' } as Translation);
  }
}

describe('App', () => {
  let httpMock: HttpTestingController;
  let secureServiceMock: { setUserAuthenticated: jest.Mock };

  beforeEach(async () => {
    secureServiceMock = {
      setUserAuthenticated: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: SecureService,
          useValue: secureServiceMock,
        },
        {
          provide: environmentToken,
          useValue: {
            api_error: 'https://example.test/',
          },
        },
        provideTransloco({
          config: {
            availableLangs: ['fr'],
            defaultLang: 'fr',
            reRenderOnLangChange: true,
            prodMode: true,
          },
          loader: TranslocoTestingLoader,
        }),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    httpMock.verify();
    jest.restoreAllMocks();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="app-title"]')?.textContent).toContain('Hello, test-signal');
  });

  it('should render primary navigation and action buttons', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('[data-testid="app-nav-autre"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="app-nav-autre-with-id"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="app-nav-shop"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="app-nav-templating"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="app-nav-error-test"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="app-auth-btn"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="app-error-handler-btn"]')).toBeTruthy();
    expect(compiled.querySelector('[data-testid="app-router-outlet"]')).toBeTruthy();
  });

  it('toggleUserAuthentication should authenticate user (via SecureService)', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const authBtn = compiled.querySelector('[data-testid="app-auth-btn"]') as HTMLButtonElement | null;
    expect(authBtn).toBeTruthy();

    authBtn!.click();
    expect(secureServiceMock.setUserAuthenticated).toHaveBeenCalledWith(true);
  });

  it('testErrorHandler should call the expected URL and log on success', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    fixture.componentInstance.testErrorHandler();

    const req = httpMock.expectOne('https://example.test/status/500');
    expect(req.request.method).toBe('GET');

    req.flush({ ok: true });

    expect(console.log).toHaveBeenCalledWith('Données reçues:', { ok: true });
  });

  it('testErrorHandler should call the expected URL and log on HTTP 500', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    fixture.componentInstance.testErrorHandler();

    const req = httpMock.expectOne('https://example.test/status/500');
    expect(req.request.method).toBe('GET');

    req.flush('Boom', { status: 500, statusText: 'Server Error' });

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining('Erreur 500 capturée dans le composant:'),
      expect.anything()
    );
  });
});
