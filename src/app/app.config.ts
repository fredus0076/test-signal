import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { GlobalErrorInterceptor } from './core/error-handler';
import { TranslocoHttpLoader } from './core/translate/transloco-loader';
import { provideTransloco } from '@jsverse/transloco';
import { environmentProvider } from './core/environment/environmentToken';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(MatSnackBarModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorInterceptor,
      multi: true
    },
    environmentProvider,
    provideAnimationsAsync(),
    provideTransloco({
        config: { 
          availableLangs: ['fr'],
          defaultLang: 'fr',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
  ]
};
