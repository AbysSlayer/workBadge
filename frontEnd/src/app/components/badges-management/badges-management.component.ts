import { Component, Inject, OnInit } from '@angular/core';
import { BadgesService } from '../../services/badges.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BadgeGenComponent } from '../badge-gen/badge-gen.component';

@Component({
  selector: 'app-badges-management',
  templateUrl: './badges-management.component.html',
  styleUrl: './badges-management.component.css'
})
export class BadgesManagementComponent implements OnInit{
  showBadge: boolean = false
  badgeData: any
  badges: any[] = []
  columns: string[] = ["ID","Nombre", "Apellidos", "Codigo de Trabajador", "Acciones"]
  constructor(public dialog: MatDialog ,private badgesSvc: BadgesService, private snackBar: MatSnackBar){
  }

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

  openBadge(userData: any) {
    const dialogRef = this.dialog.open(BadgeGenComponent, {
      width: '400px',
      data: { userData: userData }, // Pasa los datos del solapín
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
    });

  }
  showAlert(message: string){
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000
    })
  }
}
