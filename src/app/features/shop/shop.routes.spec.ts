import { SHOP_ROUTES } from './shop.routes';

describe('SHOP_ROUTES', () => {
  it('should define the shop routes', () => {
    expect(SHOP_ROUTES).toHaveLength(3);

    expect(SHOP_ROUTES[0].path).toBe('');
    expect(typeof SHOP_ROUTES[0].loadComponent).toBe('function');

    expect(SHOP_ROUTES[1].path).toBe('product/:id');
    expect(typeof SHOP_ROUTES[1].loadComponent).toBe('function');

    expect(SHOP_ROUTES[2].path).toBe('category/:category');
    expect(typeof SHOP_ROUTES[2].loadComponent).toBe('function');
  });

  it('should lazy-load the expected components for each route', async () => {
    const homeCmp = await SHOP_ROUTES[0].loadComponent!();
    const productCmp = await SHOP_ROUTES[1].loadComponent!();
    const categoryCmp = await SHOP_ROUTES[2].loadComponent!();

    // Garantit que les chemins d’import et les exports ne régressent pas.
    expect((homeCmp as any).name).toBe('ShopHomeComponent');
    expect((productCmp as any).name).toBe('ProductDetailsComponent');
    expect((categoryCmp as any).name).toBe('CategoryProductsComponent');
  });
});
