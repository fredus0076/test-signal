import { environment } from './environment.prod';

describe('environment.prod', () => {
  it('should define production environment values used by the app', () => {
    // Garantit qu’on ne déploie pas une env prod invalide.
    expect(environment.production).toBe(true);
    expect(typeof environment.api_error).toBe('string');
    expect(typeof environment.fake_api).toBe('string');

    // Contraintes minimales (URLs / flags)
    expect(environment.api_error).toContain('http');
    expect(environment.fake_api).toContain('http');
    expect(environment.enableDebugTools).toBe(false);
  });
});
