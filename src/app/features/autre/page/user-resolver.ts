import { catchError, delay, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { environmentToken } from '@core/environment/environmentToken';


export const userResolver: ResolveFn<any | null> = (route, state) => {
  const http = inject(HttpClient);
  const environment = inject(environmentToken);
  return http.get(`${environment.fake_api}users/1`).pipe(delay(1500), tap(data => console.log(data)), catchError(() => of(null)))
  
}