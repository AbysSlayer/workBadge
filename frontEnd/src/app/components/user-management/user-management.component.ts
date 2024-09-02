import { Component, OnInit } from '@angular/core';
import { UserManagement } from '../../services/user-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  modifyForm: FormGroup
  users: any[] = []
  columns: string[] = ["Carnet Identidad", "Usuario", "Contraseña", "Nombre", "Apellidos", "Codigo de trabajador", "ID de solapin", "Acciones"]
  selectedUser: any
  userId: string = ''
  username: string = ''
  password: string = ''
  firstName: string = ''
  lastName: string = ''
  workerCode: string = ''
  department: string = ''
  errorMessage: string = ''
  successMessage: string = ''
  showForm: boolean =  false

  constructor(public dialog: MatDialog ,private fb: FormBuilder, public validationSvc: ValidationService ,private userManagementSvc: UserManagement, private snackBar: MatSnackBar){
    this.modifyForm = this.fb.group({
      userId: ['', [Validators.pattern(validationSvc.onlyNumbersRegex), Validators.minLength(11), Validators.maxLength(11)]],
      username: ['', [Validators.pattern(validationSvc.lettersAndNumbersRegex)]],
      password: ['', [ Validators.minLength(8)]],
      firstName: ['', [Validators.pattern(validationSvc.onlyLettersRegex)]],
      lastName: ['', [Validators.pattern(validationSvc.onlyLettersRegex)]],
      workerCode: ['', [Validators.pattern(validationSvc.onlyNumbersRegex)]],
      department: ['', [Validators.pattern(validationSvc.onlyLettersRegex)]],
      profilePicture: [''],
    })
  }
  
  ngOnInit(): void {
    this.loadAllUsers()
  }

  loadAllUsers(){
    this.userManagementSvc.findAllUsers().subscribe((response)=>{
      console.log(response)
      this.users = response.body.filter((user: { role: string; }) => user.role !== 'admin') 
    }, (error)=>{
      console.error('Error al cargar los usuarios', error);
    })
  }

  loadUserData(){
    this.modifyForm.patchValue({
      userId: this.selectedUser.userId,
      username: this.selectedUser.username,
      password: this.selectedUser.password,
      firstName: this.selectedUser.firstName,
      lastName: this.selectedUser.lastName,
      workerCode: this.selectedUser.workerCode,
      department: this.selectedUser.department
    })
  }

  deleteUser(userId: string){
    console.log(userId)
    this.userManagementSvc.deleteUser(userId).subscribe((response)=>{
    this.showAlert(response.message)
    this.loadAllUsers()

    },
  (error) => {
        console.error('Error al eliminar usuario', error);
      })
  }

  showChangePassOption(user: any){
    this.selectedUser = user
    console.log(this.selectedUser)
    this.loadUserData()
    this.password = ''; // Reiniciar el campo de nueva contraseña
    this.resetForm()
    this.showForm = true;
  }
  
  updateUser(){
    console.log(this.userId)
    if(this.modifyForm.valid){
      this.userManagementSvc.updateUser(this.selectedUser.userId, this.modifyForm.value).subscribe((response)=>{
        if(response.ok){
          console.log('Usuario actualizado.');
          this.successMessage = 'Usuario actualizado correctamente'
          this.showForm = false
          this.modifyForm.reset()
          this.showAlert(this.successMessage)
          this.loadAllUsers()
          this.resetForm()
        }else{
          this.errorMessage = 'Ha ocurrido un error al actualizar el usuario.'
          this.showForm = false
          this.showAlert(this.errorMessage)
          this.loadAllUsers()
          this.resetForm()
        }
      },
      (error) => {
        this.errorMessage = 'Ha ocurrido un error al actualizar el usuario.'
        console.error('Error actualizar el usuario', error);
      })
    }
   
  }

  cancelUpdate(){
    this.showForm = false
    this.resetForm()
  }

  resetForm(){
    this.userId = ''
    this.username = ''
    this.password = ''
    this.firstName = ''
    this.lastName = ''
    this.workerCode = ''
    this.successMessage = ''
    this.errorMessage = ''
  }

  openQRCodeModal(userData: any) {
    console.log('QR USER DATA:' ,userData)
    const dialogRef = this.dialog.open(QrCodeComponent, {
      width: '400px',
      data: { userData: userData }, // Pasa los datos del usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });
  }

  showAlert(message: string){
    this.snackBar.open(message, 'Aceptar', {
      duration: 1000
    })
  }
}

