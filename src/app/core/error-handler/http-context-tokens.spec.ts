import { HttpContext } from '@angular/common/http';
import { SKIP_GLOBAL_SNACKBAR } from './http-context-tokens';

describe('SKIP_GLOBAL_SNACKBAR', () => {
  it('should default to false', () => {
    const context = new HttpContext();
    expect(context.get(SKIP_GLOBAL_SNACKBAR)).toBe(false);
  });

  it('should allow overriding to true', () => {
    const context = new HttpContext().set(SKIP_GLOBAL_SNACKBAR, true);
    expect(context.get(SKIP_GLOBAL_SNACKBAR)).toBe(true);
  });
});
