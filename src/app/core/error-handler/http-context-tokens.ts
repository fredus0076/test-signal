import { HttpContextToken } from '@angular/common/http';

/**
 * Token HTTP context pour désactiver l'affichage global des erreurs dans la snackbar
 * Utilisation : 
 * const context = new HttpContext().set(SKIP_GLOBAL_SNACKBAR, true);
 * this.http.get('/api/data', { context })
 */
export const SKIP_GLOBAL_SNACKBAR = new HttpContextToken<boolean>(() => false);