import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SKIP_GLOBAL_SNACKBAR } from './http-context-tokens';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  
  snackBar = inject(MatSnackBar);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Vérifier si on doit afficher l'erreur dans la snackbar
        const skipSnackbar = req.context.get(SKIP_GLOBAL_SNACKBAR);
        const isServer = error.status >= 500;
console.log('out')
        // Gérer uniquement les erreurs serveur (500 et plus)
        if (!skipSnackbar && isServer) {
          console.log('in')
          console.log('Appel de handleServerError pour status:', error.status);
          this.handleServerError(error);
        }
        // Propager l'erreur pour que les composants puissent la gérer si nécessaire
        return throwError(() => error);
      })
    );
  }

  private handleServerError(error: HttpErrorResponse): void {
    let errorMessage: string;
    
    // Messages d'erreur par code de statut
    const errorMessages: Record<number, string> = {
      500: 'Erreur interne du serveur. Veuillez réessayer plus tard.',
      501: 'Service non implémenté.',
      502: 'Passerelle incorrecte. Le serveur est temporairement indisponible.',
      503: 'Service temporairement indisponible.',
      504: 'Délai d\'attente dépassé. Le serveur met trop de temps à répondre.'
    };
    
    // Déterminer le message d'erreur à afficher
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    } else {
      errorMessage = errorMessages[error.status] || `Erreur serveur (${error.status}). Veuillez réessayer plus tard.`;
    }

    // Afficher l'erreur dans une snackbar
    this.snackBar.open(errorMessage, 'Fermer', {
        duration: 8000, // 8 secondes
        horizontalPosition: 'center',
        verticalPosition: 'top',
      panelClass: 'error-snackbar'
    });

}   
}