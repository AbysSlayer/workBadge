import { Component, OnInit } from '@angular/core';
import { BadgesService } from '../../services/badges.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-badges-management',
  templateUrl: './badges-management.component.html',
  styleUrl: './badges-management.component.css'
})
export class BadgesManagementComponent implements OnInit{
  badges: any[] = []
  columns: string[] = ["ID","Nombre", "Apellidos", "Codigo de Trabajador", "Acciones"]
  constructor(private badgesSvc: BadgesService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.loadBadges()
  }

  loadBadges(){
    this.badgesSvc.findAllBadges().subscribe((response)=>{
      console.log(response)
      this.badges = response.body
    }, (error)=>{
      console.error('Error al cargar solapines', error);
    })
  }

  deleteBadge(userId: string, badgeId: string){
    this.badgesSvc.deleteBadge(userId, badgeId).subscribe((response)=>{
      this.showAlert("Solapin eliminado con exito")
      console.log(response)
      this.loadBadges()
    })
  }

  showAlert(message: string){
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000
    })
  }

}
