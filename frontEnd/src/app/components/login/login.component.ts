import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
  }else{
    this.router.navigate(['/dashboard'])
  }
}
  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId)
        localStorage.setItem('workerCode', response.workerCode)
        localStorage.setItem('role', response.role)
        this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Inicio de sesión fallido. Verifica tus credenciales.';
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión', error);
        this.errorMessage = 'Ocurrió un error. Intenta nuevamente más tarde.';
      }
    );
  }
}


