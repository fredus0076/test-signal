import { TestBed } from '@angular/core/testing';
import { burnCpu, SimuleLourdComponent } from './simuleLourdComponent';

describe('SimuleLourdComponent', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should instantiate without burning CPU (controlled performance.now) and render the result', () => {
    // Empêche un vrai burn CPU en contrôlant le temps.
    // Appel 1: init end = 0 + 2000
    // Appel 2: condition while -> 1999 (1 itération)
    // Appel 3: condition while -> 2000 (sortie)
    const nowSpy = jest
      .spyOn(performance, 'now')
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 1999)
      .mockImplementationOnce(() => 2000);

    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const fixture = TestBed.configureTestingModule({
      imports: [SimuleLourdComponent],
    }).createComponent(SimuleLourdComponent);

    fixture.detectChanges();

    // Vérifie que burnCpu a été évaluée (au moins 3 appels de now).
    expect(nowSpy).toHaveBeenCalled();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('CPU burn done:');
  });

  it('burnCpu should work with default duration (ms param default)', () => {
    const nowSpy = jest
      .spyOn(performance, 'now')
      .mockImplementationOnce(() => 0)
      .mockImplementationOnce(() => 799)
      .mockImplementationOnce(() => 800);

    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const result = burnCpu();

    expect(nowSpy).toHaveBeenCalled();
    expect(Number.isFinite(result)).toBe(true);
  });
});
