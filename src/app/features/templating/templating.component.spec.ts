import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TemplatingComponent } from './templating.component';

describe('TemplatingComponent', () => {
  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [TemplatingComponent],
    }).compileComponents();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render loading state then done state after the simulated fetch', fakeAsync(() => {
    const fixture = TestBed.createComponent(TemplatingComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('[data-testid="templating-status-loading"]')).toBeTruthy();
    expect(el.querySelector('[data-testid="templating-products-empty"]')?.textContent).toContain(
      'Aucun produit trouvé'
    );

    tick(8500);
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="templating-status-done"]')).toBeTruthy();
    const items = Array.from(el.querySelectorAll('[data-testid="templating-products-list"] li'));
    expect(items.length).toBeGreaterThanOrEqual(3);
    expect(el.textContent).toContain('Produit A');
    expect(el.textContent).toContain('Produit B');
    expect(el.textContent).toContain('Produit C');
  }));

  it('should switch role message when role changes', fakeAsync(() => {
    const fixture = TestBed.createComponent(TemplatingComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('[data-testid="templating-role-message"]')?.textContent).toContain(
      'visiteur'
    );

    component.role.set('admin');
    fixture.detectChanges();

    expect(el.querySelector('[data-testid="templating-role-message"]')?.textContent).toContain(
      'administrateur'
    );

    tick(8500);
  }));

  it('should compute speed and update when signals change', fakeAsync(() => {
    const fixture = TestBed.createComponent(TemplatingComponent);
    fixture.detectChanges();
    tick(0);
    fixture.detectChanges();

    const component = fixture.componentInstance;
    const el = fixture.nativeElement as HTMLElement;

    const speedInput = el.querySelector('[data-testid="templating-speed-input"]') as HTMLInputElement;
    expect(speedInput.value).toBe('50');

    component.selectedDistance.set(200);
    fixture.detectChanges();
    tick(0);
    fixture.detectChanges();
    expect(speedInput.value).toBe('100');

    tick(8500);
  }));

  it('clickOnMe should update linkedExplicit value', fakeAsync(() => {
    const fixture = TestBed.createComponent(TemplatingComponent);
    fixture.detectChanges();

    const component = fixture.componentInstance;

    expect(component.linkedExplicit()).toContain('-linked');

    component.clickOnMe();
    fixture.detectChanges();

    expect(component.linkedExplicit()).toContain('-clicked');

    tick(8500);
  }));
});
