import { TestBed } from '@angular/core/testing';
import { CategorySearchControlComponent } from './category-search-control.component';

describe('CategorySearchControlComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorySearchControlComponent],
    }).compileComponents();
  });

  it('should propagate value changes on input', () => {
    const fixture = TestBed.createComponent(CategorySearchControlComponent);
    const component = fixture.componentInstance;

    const onChange = jest.fn();
    component.registerOnChange(onChange);

    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '[data-testid="category-search-control-input"]'
    ) as HTMLInputElement;

    input.value = 'shoe';
    input.dispatchEvent(new Event('input'));

    expect(component.value).toBe('shoe');
    expect(onChange).toHaveBeenCalledWith('shoe');
  });

  it('should not throw if used before CVA registration (no-op handlers)', () => {
    // Garantit la robustesse du composant si l’input arrive
    // avant l’attachement Angular Forms (handlers no-op).
    const fixture = TestBed.createComponent(CategorySearchControlComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(() => component.onInput('x')).not.toThrow();
    expect(component.value).toBe('x');

    expect(() => component.onBlur()).not.toThrow();
  });

  it('writeValue should coerce null to empty string', () => {
    // Garantit la branche nullish (value ?? '').
    const fixture = TestBed.createComponent(CategorySearchControlComponent);
    const component = fixture.componentInstance;

    component.writeValue(null);
    expect(component.value).toBe('');
  });

  it('should call onTouched on blur', () => {
    const fixture = TestBed.createComponent(CategorySearchControlComponent);
    const component = fixture.componentInstance;

    const onTouched = jest.fn();
    component.registerOnTouched(onTouched);

    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      '[data-testid="category-search-control-input"]'
    ) as HTMLInputElement;

    input.dispatchEvent(new Event('blur'));
    expect(onTouched).toHaveBeenCalled();
  });

  it('clear should reset value and touch when enabled', () => {
    const fixture = TestBed.createComponent(CategorySearchControlComponent);
    const component = fixture.componentInstance;

    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    component.writeValue('abc');
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector(
      '[data-testid="category-search-control-clear"]'
    ) as HTMLButtonElement;

    btn.click();

    expect(component.value).toBe('');
    expect(onChange).toHaveBeenCalledWith('');
    expect(onTouched).toHaveBeenCalled();
  });

  it('clear should do nothing when disabled', () => {
    const fixture = TestBed.createComponent(CategorySearchControlComponent);
    const component = fixture.componentInstance;

    const onChange = jest.fn();
    component.registerOnChange(onChange);

    component.writeValue('abc');
    component.setDisabledState(true);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector(
      '[data-testid="category-search-control-clear"]'
    ) as HTMLButtonElement;

    btn.click();

    expect(component.value).toBe('abc');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('clear should short-circuit when disabled (even if called programmatically)', () => {
    const fixture = TestBed.createComponent(CategorySearchControlComponent);
    const component = fixture.componentInstance;

    const onChange = jest.fn();
    const onTouched = jest.fn();
    component.registerOnChange(onChange);
    component.registerOnTouched(onTouched);

    component.writeValue('abc');
    component.setDisabledState(true);
    fixture.detectChanges();

    component.clear();

    expect(component.value).toBe('abc');
    expect(onChange).not.toHaveBeenCalled();
    expect(onTouched).not.toHaveBeenCalled();
  });
});
