export const environment = {
  production: false,

  // Exemple 1: URL d'API en dev
  apiUrl: 'http://localhost:3000',

  // Exemple 2: feature flag en dev
  enableDebugTools: true,
  api_error: 'https://httpbin.org/',
  fake_api: 'https://jsonplaceholder.typicode.com/'
} as const;
