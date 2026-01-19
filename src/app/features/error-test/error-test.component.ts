import { Component } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SKIP_GLOBAL_SNACKBAR } from '../../core/error-handler';

@Component({
  selector: 'app-error-test',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Test du Gestionnaire d'Erreurs Global</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Testez le gestionnaire d'erreurs avec ces boutons :</p>
        
        <button mat-raised-button color="warn" (click)="triggerServerError()">
          Déclencher une erreur 500 (avec snackbar)
        </button>
        
        <button mat-raised-button color="accent" (click)="triggerServerErrorWithoutSnackbar()">
          Déclencher une erreur 500 (sans snackbar)
        </button>
        
        <button mat-raised-button color="primary" (click)="triggerClientError()">
          Déclencher une erreur client
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      margin: 20px;
      max-width: 500px;
    }
    
    button {
      margin: 8px;
    }
  `]
})
export class ErrorTestComponent {

  constructor(private http: HttpClient) {}

  triggerServerError() {
    // Simule un appel qui provoquera une erreur 500
    // La snackbar s'affichera automatiquement
    this.http.get('/api/nonexistent-endpoint-500').subscribe({
      error: (error) => console.log('Erreur capturée:', error)
    });
  }

  triggerServerErrorWithoutSnackbar() {
    // Simule un appel qui provoquera une erreur 500 mais sans snackbar
    const context = new HttpContext().set(SKIP_GLOBAL_SNACKBAR, true);
    this.http.get('/api/nonexistent-endpoint-500', { context }).subscribe({
      error: (error) => console.log('Erreur capturée (sans snackbar):', error)
    });
  }

  triggerClientError() {
    // Déclenche une erreur JavaScript qui sera gérée par le ErrorHandler global
    throw new Error('Erreur JavaScript simulée');
  }
}