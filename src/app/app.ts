import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { SecureService } from './core/auth/secure.service';
import { HttpClient } from '@angular/common/http';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslocoPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('test-signal');
  authService = inject(SecureService);
  http = inject(HttpClient); 

  toggleUserAuthentication() {
    this.authService.setUserAuthenticated(true);
  }

  testErrorHandler() {
    // Utilisation d'httpbin.org qui retourne exactement le code d'erreur demandé
    this.http.get('https://httpbin.org/status/500').subscribe({
      next: (data) => console.log('Données reçues:', data),
      error: (error) => console.log('Erreur 500 capturée dans le composant:', error)
    });
  }

}
