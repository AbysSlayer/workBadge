import { Component, OnInit } from '@angular/core';
import { userRequestService } from '../services/user.request.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrl: './user-request.component.css'
})
export class UserRequestComponent implements OnInit {
  reqFirstName: string = ''
  reqLastName: string = ''
  reqWorkerCode: string = ''
  reqDepartment: string = ''
  reqMessage: string = ''
  requests: any[] = []
  columns: string[] = ["ID", "Nombre", "Apellidos", "Codigo de trabajador", "Estado"]

  constructor(private userReqSvc: userRequestService, private authService: AuthService){}

  ngOnInit(): void {
    this.loadRequests()
  }

  createRequest(){
    const reqUserId = this.authService.getUserId()
    this.userReqSvc.createRequest(reqUserId, this.reqFirstName, this.reqLastName, this.reqWorkerCode, this.reqDepartment).subscribe((response) => {
      this.reqMessage = 'Solicitud enviada exitosamente.'
      this.loadRequests()
      this.resetForm()

    }, (error) =>{
      if(error.error && error.error.message){
        this.reqMessage = error.error.message
      }else{
        this.reqMessage = 'Ocurrió un error al enviar la solicitud. Intenta nuevamente más tarde.';
      }
      console.error('Error al enviar la solicitud', error);
    })
  }

  loadRequests(){
    const reqWorkerCode = this.authService.getWorkerCode()
    this.userReqSvc.getUserRequests(reqWorkerCode).subscribe((response) => {
      // console.log(response)
      this.requests = response.requests}, (error) => {
      console.error('Error al cargar solicitudes', error);
    })
    console.log(this.requests)
  }


  resetForm(){
    this.reqFirstName = ''
    this.reqLastName = ''
    this.reqWorkerCode = ''
    this.reqDepartment = ''
  }
}
