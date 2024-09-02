import { Component, OnInit } from '@angular/core';
import { userRequestService } from '../services/user.request.service';
import { AuthService } from '../services/auth.service';
import { UserManagement } from '../services/user-management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  uId: any
  requestForm: FormGroup
  columns: string[] = ["ID", "Nombre", "Apellidos", "Codigo de trabajador", "Estado"]

  constructor(private fb: FormBuilder,private userReqSvc: userRequestService, private authService: AuthService, private userMngSvc: UserManagement){
    this.requestForm = this.fb.group({
      reqFirstName: ['', Validators.required],
      reqLastName: ['', Validators.required],
      reqWorkerCode: ['', Validators.required],
      reqDepartment: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.uId = localStorage.getItem('userId')
    console.log(this.uId)
    this.userMngSvc.getUser(this.uId).subscribe(user=>{
      console.log(user)
      this.requestForm.patchValue({
        reqFirstName: user.body.firstName,
        reqLastName: user.body.lastName,
        reqWorkerCode: user.body.workerCode,
        reqDepartment: user.body.department
      })
    })
    this.loadRequests()
  }

  
  createRequest(){
    const reqUserId = this.authService.getUserId()
    if(this.requestForm.valid){
      this.userReqSvc.createRequest(this.requestForm.value).subscribe((response) => {
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
   
  }

  loadRequests(){
    const reqWorkerCode = this.authService.getWorkerCode()
    this.userReqSvc.getUserRequests(reqWorkerCode).subscribe((response) => {
      // console.log(response)
      this.requests = response.requests}, (error) => {
      console.error('Error al cargar solicitudes', error);
    })
    // console.log(this.user)
    console.log(this.requests)
  }

  resetForm(){
    this.reqFirstName = ''
    this.reqLastName = ''
    this.reqWorkerCode = ''
    this.reqDepartment = ''
  }

  getUId(){
    this.uId = this.authService.getUserId()
  }

}
