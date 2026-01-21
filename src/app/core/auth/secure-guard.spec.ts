import { TestBed } from '@angular/core/testing';
import { SecureService } from './secure.service';
import { secureGuard } from './secure-guard';

describe('secureGuard', () => {
  let secureServiceMock: { isAuthenticated: jest.Mock };

  beforeEach(() => {
    secureServiceMock = {
      isAuthenticated: jest.fn(),
    };

    if (typeof window.alert !== 'function') {
      (window as any).alert = () => {};
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: SecureService,
          useValue: secureServiceMock,
        },
      ],
    });

    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return true when user is authenticated', () => {
    secureServiceMock.isAuthenticated.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => secureGuard({} as any, {} as any));

    expect(result).toBe(true);
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should alert and return false when user is not authenticated', () => {
    secureServiceMock.isAuthenticated.mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() => secureGuard({} as any, {} as any));

    expect(result).toBe(false);
    expect(window.alert).toHaveBeenCalledWith(
      'Accès refusé. Vous devez être authentifié pour accéder à cette page.'
    );
  });
});
