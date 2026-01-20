import { ENVIRONMENT_TOKEN } from '@core/environnement/environnement.token';

import { catchError, delay, of, tap } from 'rxjs';


import { HttpClient } from '@angular/common/http';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';


export const userResolver: ResolveFn<any | null> = (route, state) => {
  const http = inject(HttpClient);
  const environnement = inject(ENVIRONMENT_TOKEN);
  return http.get(`${environnement.fake_api}users/1`).pipe(delay(1500), tap(data => console.log(data)), catchError(() => of(null)))
  
}