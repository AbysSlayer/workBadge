import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationService } from '../../services/validation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm: FormGroup
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
  existsError: boolean = false
  validationMessages: any[] = []


  constructor(private fb: FormBuilder ,private authService:  AuthService, public validationSvc: ValidationService ,private router: Router, private snackBar: MatSnackBar){
    this.signUpForm = this.fb.group({
      userId: ['', [Validators.required, Validators.pattern(validationSvc.onlyNumbersRegex), Validators.minLength(11), Validators.maxLength(11)]],
      username: ['', [Validators.required, Validators.pattern(validationSvc.lettersAndNumbersRegex)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.pattern(validationSvc.onlyLettersRegex)]],
      lastName: ['', [Validators.required, Validators.pattern(validationSvc.onlyLettersRegex)]],
      workerCode: ['', [Validators.required, Validators.pattern(validationSvc.onlyNumbersRegex)]],
      department: ['', [Validators.required, Validators.pattern(validationSvc.onlyLettersRegex)]],
      profilePicture: [''],
    })
  }


  onFileSelected(event: any){
    const file: File = event.target.files[0]
    this.profilePicture = file
  }

  onSubmit(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value)
      this.authService.checkUserExists(this.signUpForm.value.userId).subscribe((response)=>{
        if(response.exists){
        console.log(response)
        console.log(this.profilePicture)
        this.errorMessage = 'El userId o workerCode ya están en uso. Por favor, elige otros valores.'
        this.showAlert(this.errorMessage)
        }else{
        this.authService.register(this.signUpForm.value).subscribe((response) => {if(response.success){
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
    }else{
      this.showAlert('Por favor, verifique nuevamente los campos necesarios.')
    }
  }

  showAlert(message: string){
    this.snackBar.open(message, 'Aceptar', {
      duration: 1000
    })
  }
}
