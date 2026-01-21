import { routes } from './app.routes';

describe('routes (app)', () => {
  it('should define top-level routes', () => {
    expect(routes.map((r) => r.path)).toEqual(['autre', 'templating', 'shop']);
    expect(typeof routes[0].loadChildren).toBe('function');
    expect(typeof routes[1].loadComponent).toBe('function');
    expect(typeof routes[2].loadChildren).toBe('function');
  });

  it('should lazy-load child routes and components (regression guard)', async () => {
    const autreRoutes = (await routes[0].loadChildren!()) as any[];
    expect(Array.isArray(autreRoutes)).toBe(true);
    // Les routes "autre" doivent exposer "" et ":id".
    expect(autreRoutes.map((r) => r.path)).toEqual(['', ':id']);

    const templatingCmp = await routes[1].loadComponent!();
    expect((templatingCmp as any).name).toBe('TemplatingComponent');

    const shopRoutes = (await routes[2].loadChildren!()) as any[];
    expect(Array.isArray(shopRoutes)).toBe(true);
    expect(shopRoutes.map((r) => r.path)).toEqual(['', 'product/:id', 'category/:category']);
  });
});
