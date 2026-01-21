import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '42' }),
            },
          },
        },
      ],
    }).compileComponents();
  });

  it('should read product id from route snapshot and render it', () => {
    const fixture = TestBed.createComponent(ProductDetailsComponent);
    fixture.detectChanges();

    const instance = fixture.componentInstance;
    expect(instance.productId).toBe('42');

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('[data-testid="product-details-id"]')?.textContent).toContain('42');
  });
});
