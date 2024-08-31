import { Component, OnInit } from '@angular/core';
import { Badge } from '../../interfaces/badge';
import { ReportsService } from '../../services/reports.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  amountPerMonth: any[] = []
  detailedBadges: any[] = []
  months: number[] = []
  years: number[] = []
  month: number = 1
  year: number = new Date().getFullYear()
  emptyList: boolean = false
  defaultMonth: number = 0


  constructor(private reportSvc: ReportsService, private snackBar: MatSnackBar){

  }
  ngOnInit(): void {
    this.getBadgesPerMonth()
    this.generateMonths()
    this.generateYears()
  }

  getBadgesPerMonth(){
    this.reportSvc.badgesPerMonth().subscribe((data)=>{
      this.amountPerMonth = data
    },
    (error) => {
      console.error('Error al obtener cantidad de solapines por mes', error);
    }
  )
  }

  getDetailedBadges(){
    this.reportSvc.detailedBadgesPerMonth(this.month, this.year).subscribe((data)=> {
      this.detailedBadges = data
      if(this.emptyList = this.detailedBadges.length === 0){
        this.showAlert("No se crearon solapines en la fecha seleccionada. ")
      }
    },
    (error) => {
      console.error('Error al obtener detalles de solapines', error);
      this.showAlert('Error al obtener detalles de solapines.')
    })
  }

  showAlert(message: string){
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    })
  }

  generateMonths(){
    for (let i = 1; i <= 12; i++) {
      this.months.push(i)
    }
    console.log(this.months)
    this.defaultMonth = this.months[0]
    console.log(this.defaultMonth)
  }

  generateYears(){
    const currentYear = new Date().getFullYear()
    const startYear = currentYear
    const endYear = startYear + 10

    for (let year = startYear; year <= endYear; year++){
      this.years.push(year)
    }
  }
}
