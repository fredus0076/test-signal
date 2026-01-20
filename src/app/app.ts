import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { SecureService } from '@core/auth/secure.service';
import { HttpClient } from '@angular/common/http';
import { TranslocoPipe } from '@jsverse/transloco';
import { environmentToken } from '@core/environment/environmentToken';

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
  environment = inject(environmentToken);

  toggleUserAuthentication() {
    this.authService.setUserAuthenticated(true);
  }

  testErrorHandler() {
    // Utilisation d'httpbin.org qui retourne exactement le code d'erreur demandé
    this.http.get(`${this.environment.api_error}status/500`).subscribe({
      next: (data) => console.log('Données reçues:', data),
      error: (error) => console.log('Erreur 500 capturée dans le composant:', error)
    });
  }

}
