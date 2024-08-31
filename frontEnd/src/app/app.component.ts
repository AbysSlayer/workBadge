import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'solapinFront';

  constructor(private authService: AuthService, private router: Router){}

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); // Verifica si el usuario está autenticado
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
