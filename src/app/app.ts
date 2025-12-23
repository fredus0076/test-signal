import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { TemplatingComponent } from './features/templating/templating.component';
import { SecureService } from './autre/secure.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplatingComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('test-signal');
  authService = inject(SecureService);

  toggleUserAuthentication() {
    this.authService.setUserAuthenticated(true);
  }}
