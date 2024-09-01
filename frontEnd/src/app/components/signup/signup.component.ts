import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  profilePicture: any = null
  errorMessage:string = ''
  successMessage: string = ''
  user: any


  constructor(private authService:  AuthService, private router: Router, private snackBar: MatSnackBar){}
  
  onFileSelected(event: any){
    const file: File = event.target.files[0]
    this.profilePicture = file
  }

  onSubmit(){
    const formData = new FormData()
    formData.append('userId', this.userId)
    formData.append('username', this.username)
    formData.append('password', this.password)
    formData.append('firstName', this.firstName)
    formData.append('lastName', this.lastName)
    formData.append('workerCode', this.workerCode)
    formData.append('department', this.department)
    formData.append('profilePicture', this.profilePicture)
    this.authService.checkUserExists(this.userId).subscribe((response)=>{
      if(response.exists){
      console.log(response)
      console.log(this.profilePicture)
      this.errorMessage = 'El userId o workerCode ya están en uso. Por favor, elige otros valores.'
      }else{
      this.authService.register(formData).subscribe((response) => {if(response.success){
      this.user = response.user
      console.log("Usuario:", this.user)
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('workerCode', response.workerCode);
      localStorage.setItem('role', response.role);
      this.successMessage = "Registro exitoso. Redirigiendo al dashboard...'"
      this.showAlert(this.successMessage)
      setTimeout(()=>{
        this.router.navigate(['/dashboard'])
      }, 2000)
      }else{
        this.errorMessage = response.message
      }}, (error) =>{
        console.error("Error en el registro", error)
        this.errorMessage = 'Ocurrió un error. Intenta nuevamente más tarde.';
        this.showAlert(this.errorMessage)
      }
    );
    }},
  (error)=>{
    console.error('Error al verificar si el usuario existe', error);
        this.errorMessage = 'Ocurrió un error al verificar si el usuario existe. Intenta nuevamente más tarde.';
  });
    
  }

  showAlert(message: string){
    this.snackBar.open(message, 'Aceptar', {
      duration: 1000
    })
  }
}
