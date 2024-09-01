import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserManagement } from './services/user-management.service';
import { Router } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Gestor de Solapines';
  user: any = null

  constructor(private authService: AuthService, private router: Router, private userMngSvc: UserManagement){}
  ngOnInit(): void {
    this.user = this.findUser()
    
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); // Verifica si el usuario está autenticado
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  findUser(){
    const uid: any = this.authService.getUserId()
    const uBody = this.userMngSvc.getUser(uid).subscribe((response)=>{
    this.user = response.body
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    this.clearUserData();
  }

  // Evento que se dispara cuando se detiene la aplicación
  @HostListener('window:unload', ['$event'])
  unloadHandler(event: any) {
    this.clearUserData();
  }

  clearUserData() {
    this.authService.logout();
  }
}
