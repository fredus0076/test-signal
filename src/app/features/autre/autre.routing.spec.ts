import { AutreRoutes } from './autre.routing';
import { secureGuard } from '@core/auth/secure-guard';
import { userResolver } from './page/user-resolver';

describe('AutreRoutes', () => {
  it('should define routes with guard and resolver', () => {
    expect(AutreRoutes.map((r) => r.path)).toEqual(['', ':id']);

    // Route racine protégée
    expect(AutreRoutes[0].canActivate).toEqual([secureGuard]);

    // Route avec resolver
    expect(AutreRoutes[1].resolve).toEqual({ userData: userResolver });
  });

  it('should lazy-load the expected components for each route', async () => {
    const normalCmp = await AutreRoutes[0].loadComponent!();
    const withIdCmp = await AutreRoutes[1].loadComponent!();

    // Garantit que le wiring lazy-loading est correct (chemins + exports).
    expect((normalCmp as any).name).toBe('AutreNormalComponent');
    expect((withIdCmp as any).name).toBe('AutreWithIdComponent');
  });
});
