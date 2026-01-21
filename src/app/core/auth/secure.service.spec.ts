import { TestBed } from '@angular/core/testing';
import { SecureService } from './secure.service';

describe('SecureService', () => {
  let service: SecureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureService],
    });

    service = TestBed.inject(SecureService);
  });

  it('should expose authentication state via isAuthenticated (false by default)', () => {
    // Garantit que la valeur calculée reflète l’état initial.
    expect(service.isUserAuthenticated()).toBe(false);
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should return true when isUserAuthenticated is true', () => {
    // Garantit la branche "true" de l’expression conditionnelle.
    service.isUserAuthenticated.set(true);
    expect(service.isAuthenticated()).toBe(true);
  });

  it('setUserAuthenticated should toggle the internal signal', () => {
    // Garantit l’effet de bord public : un appel change l’état.
    expect(service.isUserAuthenticated()).toBe(false);

    service.setUserAuthenticated(true);
    expect(service.isUserAuthenticated()).toBe(true);

    service.setUserAuthenticated(false);
    expect(service.isUserAuthenticated()).toBe(false);
  });
});
