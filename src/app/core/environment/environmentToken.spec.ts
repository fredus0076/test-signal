import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { environmentProvider, environmentToken } from './environmentToken';

describe('environmentToken', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should allow injecting a provided environment value', () => {
    const env = { api_error: 'https://example.test/' } as any;

    TestBed.configureTestingModule({
      providers: [
        {
          provide: environmentToken,
          useValue: env,
        },
      ],
    });

    expect(TestBed.inject(environmentToken)).toBe(env);
  });

  it('environmentProvider should bind environmentToken to the default environment', () => {
    expect(environmentProvider.provide).toBe(environmentToken);
    expect(environmentProvider.useValue).toBe(environment);
  });
});
