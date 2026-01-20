import { CommonModule } from '@angular/common';
import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-category-search-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-search-control.component.html',
  styleUrls: ['./category-search-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategorySearchControlComponent),
      multi: true,
    },
  ],
})
export class CategorySearchControlComponent implements ControlValueAccessor {
  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: string) {
    this.value = value;
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
  }

  clear() {
    if (this.disabled) return;
    this.onInput('');
    this.onTouched();
  }
}
