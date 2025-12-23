import { Routes } from '@angular/router';
import { userResolver } from './page/user-resolver';
import { secureGuard } from './secure-guard';

export const AutreRoutes: Routes = [
  { 
    path: '',
    loadComponent: () => import('./page/autre-normal/autre-normal.component').then(m => m.AutreNormalComponent), //loadComponent quand on appel un component
    canActivate: [secureGuard],
  },
  { 
    path: ':id',
    loadComponent: () => import('./page/autre-with-id/autre-with-id.component').then(m => m.AutreWithIdComponent),
    resolve: { 
      userData: userResolver
    }
  },
];
