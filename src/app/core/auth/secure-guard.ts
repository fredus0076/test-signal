import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SecureService } from './secure.service';

export const secureGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(SecureService).isAuthenticated();
  if (!isAuthenticated) {
    alert('Accès refusé. Vous devez être authentifié pour accéder à cette page.');
    return false;
  }
  return true;
};
