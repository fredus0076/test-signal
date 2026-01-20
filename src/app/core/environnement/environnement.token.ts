import { environment } from '@environnement';
import { InjectionToken } from '@angular/core';

export const ENVIRONMENT_TOKEN = new InjectionToken<typeof environment>('ENVIRONMENT_TOKEN');