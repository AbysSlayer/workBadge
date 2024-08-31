import { Component, OnInit } from '@angular/core';
import { userRequestService } from '../../services/user.request.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrl: './request-management.component.css'
})
export class RequestManagementComponent implements OnInit {
  requests: any[] = []
  columns: string[] = ["ID", "Nombre", "Apellidos", "Codigo de trabajador", "Departamento","Estado", "Acciones"]


  constructor(private userRequestSvc: userRequestService, private snackBar: MatSnackBar ){

  }

  ngOnInit(): void {
    this.loadRequests()
  }

  loadRequests(){
    this.userRequestSvc.getAllRequests().subscribe((response)=>{
      console.log(response)
      this.requests = response.body
    }, (error)=>{
      console.error('Error al cargar solicitudes', error);
    })
  }

  convertToBadge(reqFirstName: string, reqLastName: string, reqWorkerCode: string, userId: string){
    this.userRequestSvc.convertToBadge(reqFirstName, reqLastName, reqWorkerCode, userId).subscribe((response)=>{
      console.log('Solicitud convertida en solapin:', response)
      this.showAlert('Solicitud convertida en solapin')
      this.loadRequests()
    }, (error)=>{
      console.error('Error al convertir la solicitud en solapin', error);
    })
  }

  showAlert(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    })
  }
}
