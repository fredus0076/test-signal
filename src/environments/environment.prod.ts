export const environment = {
  production: true,

  // Exemple 1: URL d'API en prod
  apiUrl: 'https://api.example.com',

  // Exemple 2: feature flag en prod
  enableDebugTools: false,
  api_error: 'https://httpbin.org/',
  fake_api: 'https://jsonplaceholder.typicode.com/'

} as const;
