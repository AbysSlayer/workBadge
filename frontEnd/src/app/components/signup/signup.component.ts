import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  userId: string = ''
  username: string = ''
  password: string = ''
  firstName: string = ''
  lastName: string = ''
  workerCode: string = ''
  department: string = ''
  errorMessage:string = ''
  successMessage: string = ''

  constructor(private authService: AuthService, private router: Router){}
 
  onSubmit(){
    this.authService.checkUserExists(this.userId).subscribe((response)=>{
      if(response.exists){
      console.log(response)
      this.errorMessage = 'El userId o workerCode ya están en uso. Por favor, elige otros valores.'
      }else{
      this.authService.register(this.userId, this.username, this.password, this.firstName, this.lastName, this.workerCode, this.department).subscribe((response) => {if(response.success){
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('workerCode', response.workerCode);
      localStorage.setItem('role', response.role);
      this.successMessage = "Registro exitoso. Redirigiendo al dashboard...'"
      setTimeout(()=>{
        this.router.navigate(['/dashboard'])
      }, 2000)
      }else{
        this.errorMessage = response.message
      }}, (error) =>{
        console.error("Error en el registro", error)
        this.errorMessage = 'Ocurrió un error. Intenta nuevamente más tarde.';
      }
    );
    }},
  (error)=>{
    console.error('Error al verificar si el usuario existe', error);
        this.errorMessage = 'Ocurrió un error al verificar si el usuario existe. Intenta nuevamente más tarde.';
  });
    
  }
}
