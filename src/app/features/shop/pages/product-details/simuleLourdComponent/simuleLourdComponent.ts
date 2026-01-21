import { ChangeDetectionStrategy, Component } from '@angular/core';

export function burnCpu(ms = 800) {
  const end = performance.now() + ms;
  let x = 0;
  while (performance.now() < end) {
    // Calculs arbitraires
    x = Math.sin(x + Math.random()) * Math.cos(x + 1);
  }
  return x;
}
@Component({
  selector: 'app-simule-lourd-component',
  imports: [],
  template: `<p>CPU burn done: {{ result }}</p>`,
  styleUrl: './simuleLourdComponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimuleLourdComponent {
  result = burnCpu(2000);
 }
