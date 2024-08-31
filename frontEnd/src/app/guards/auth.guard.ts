import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const isAuthenticated = this.authService.isAuthenticated();
      if(isAuthenticated && route.routeConfig?.path === 'login' || route.routeConfig?.path === 'signup'){
        this.router.navigate(['/dashboard']);
        return false;
      }
      if(!isAuthenticated){
        this.router.navigate(['/login'])
        return false
      }
    
    return true; // Permitir el acceso a la ruta
  }
}
