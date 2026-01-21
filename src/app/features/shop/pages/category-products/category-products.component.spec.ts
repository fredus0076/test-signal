import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { CategoryProductsComponent } from './category-products.component';

describe('CategoryProductsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryProductsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ category: 'shoes' }),
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should read category from route snapshot and render it', () => {
    const fixture = TestBed.createComponent(CategoryProductsComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.category).toBe('shoes');

    const el = fixture.nativeElement as HTMLElement;
    expect(
      el.querySelector('[data-testid="category-products-category"]')?.textContent
    ).toContain('shoes');
  });

  it('should update the reactive form value via the custom CVA control', () => {
    const fixture = TestBed.createComponent(CategoryProductsComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector(
      '[data-testid="category-search-control-input"]'
    ) as HTMLInputElement;

    input.value = 'boot';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.componentInstance.form.value.search).toBe('boot');
    expect(el.querySelector('[data-testid="category-products-debug"]')?.textContent).toContain('boot');

    const clearBtn = el.querySelector(
      '[data-testid="category-search-control-clear"]'
    ) as HTMLButtonElement;

    clearBtn.click();
    fixture.detectChanges();

    expect(fixture.componentInstance.form.value.search).toBe('');
    expect(el.querySelector('[data-testid="category-products-debug"]')?.textContent).toContain('');
  });
});
