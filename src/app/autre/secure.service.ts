import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SecureService {
  isUserAuthenticated = signal(false);
  constructor() { }

  isAuthenticated = computed((): boolean => {   
    return this.isUserAuthenticated() ? true : false; // Retourne true si le token existe, sinon false
  });

  public setUserAuthenticated(authenticated: boolean) {
    this.isUserAuthenticated.update((currentValue) => !currentValue);
  }
}
