import { Component, OnInit } from '@angular/core';
import { UserManagement } from '../../services/user-management.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
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

  constructor(private userManagementSvc: UserManagement){}
  
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

  deleteUser(userId: string){
    console.log(userId)
    this.userManagementSvc.deleteUser(userId).subscribe((response)=>{
    this.loadAllUsers()
    },
  (error) => {
        console.error('Error al eliminar usuario', error);
      })
  }

  showChangePassOption(user: any){
    this.selectedUser = user
    console.log(this.selectedUser)
    this.password = ''; // Reiniciar el campo de nueva contraseña
    this.showForm = true;
  }
  
  updateUser(userId: string){
    console.log(this.userId)
    this.userManagementSvc.updateUser(userId, this.userId, this.username, this.password, this.firstName, this.lastName, this.workerCode).subscribe((response)=>{
      console.log('Usuario actualizado.');
      this.successMessage = 'Usuario actualizado correctamente'
      this.showForm = false
      this.loadAllUsers()
    },
    (error) => {
      this.errorMessage = 'Ha ocurrido un error al actualizar el usuario.'
      console.error('Error actualizar el usuario', error);
    })
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
  }
}

