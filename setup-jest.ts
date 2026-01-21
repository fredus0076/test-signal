import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Certains environnements Node peuvent ne pas exposer TextEncoder/TextDecoder
// (utile pour des libs DOM / Angular CDK dans les tests)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const g: any = globalThis as any;

if (!g.TextEncoder) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const util = require('util');
  g.TextEncoder = util.TextEncoder;
  g.TextDecoder = util.TextDecoder;
}

if (!g.IntersectionObserver) {
  g.IntersectionObserver = class IntersectionObserver {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  };
}
