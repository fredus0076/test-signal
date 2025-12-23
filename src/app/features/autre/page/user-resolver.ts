import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, delay, of, tap } from 'rxjs';

export const userResolver: ResolveFn<any | null> = (route, state) => {
  const http = inject(HttpClient);
  return http.get('https://jsonplaceholder.typicode.com/users/1').pipe(delay(1500), tap(data => console.log(data)), catchError(() => of(null)))
  
}