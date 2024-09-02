import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import Qrious from 'qrious'


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent implements OnInit {
  qrCodeData: string;
  qrCodeElementId: string = 'qr-code';

  constructor( private matSnack: MatSnackBar,public dialogRef: MatDialogRef<QrCodeComponent>, @Inject(MAT_DIALOG_DATA) public data: {userData: any}){
    this.qrCodeData = JSON.stringify(data.userData)
  }
  ngOnInit(): void {
    this.generateQRCode()
  }

  generateQRCode() {
    const qrCodeElement = document.getElementById('qr-code')
    if(qrCodeElement){
      const qrCode = new Qrious({
        element: qrCodeElement as HTMLCanvasElement,
        value: this.qrCodeData,
        size: 256,
        level: 'H'
      })
    }else{
      console.error('Elemento qrcode no encontrado')
    }
    
  }

  onNoClick(): void{
    this.dialogRef.close()
  }

  printQRCode() {
    try {
    const printWindow = window.open('', '_blank');
    const canvas = document.getElementById('qr-code') as HTMLCanvasElement
    if(canvas){
      const imgData = canvas.toDataURL('image/png')
      printWindow?.document.write(`
        <html>
         <head>
           <title>Imprimir Código QR</title>
           <style>
             body { text-align: center; }
             img { margin: 20px auto; display: block; }
           </style>
         </head>
         <body>
           <h1>Código QR</h1>
           <img src="${imgData}" />
         </body>
       </html>
     `);
     printWindow?.document.close();
     printWindow?.print();
    }else{
      this.showAlert('El elemento canvas no existe.')
    }
    }catch (error) {
      console.log(error)
    } 
}

showAlert(message: string){
  this.matSnack.open(message, 'Aceptar', {
    duration: 1000
  })
}
}