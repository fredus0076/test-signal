import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ShopHomeComponent } from './shop-home.component';

describe('ShopHomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopHomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render title and links', () => {
    const fixture = TestBed.createComponent(ShopHomeComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('[data-testid="shop-home-title"]')?.textContent).toContain(
      'Bienvenue dans la boutique'
    );

    const productAnchor = el.querySelector('[data-testid="shop-home-link-product-1"]') as HTMLAnchorElement;
    const categoryAnchor = el.querySelector('[data-testid="shop-home-link-category-shoes"]') as HTMLAnchorElement;

    expect(productAnchor).toBeTruthy();
    expect(categoryAnchor).toBeTruthy();

    // En test DOM, RouterLink écrit un href (souvent absolu via JSDOM). On vérifie la partie utile.
    expect(productAnchor.getAttribute('href') ?? productAnchor.href).toContain('/shop/product/1');
    expect(categoryAnchor.getAttribute('href') ?? categoryAnchor.href).toContain('/shop/category/shoes');
  });
});
