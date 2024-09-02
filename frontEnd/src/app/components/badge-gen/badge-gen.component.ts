import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-badges-management',
  templateUrl: './badge-gen.component.html',
})
export class BadgeGenComponent implements OnInit, AfterViewInit {
  badgeData: any;
  badgeGenerated: boolean = false

  constructor( private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<BadgeGenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userData: any }
  ) {
    this.badgeData = data.userData; // Datos del solapín
  }

  ngOnInit() {
    this.drawBadge();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.drawBadge()
    this.badgeGenerated = true
  }

  drawBadge() {
    try {
        const canvas = document.getElementById('badgeCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Configuración del canvas
      canvas.width = 600; // Ancho del solapín
      canvas.height = 350; // Alto del solapín

      // Fondo del solapín
      ctx.fillStyle = '#f0f0f0'; // Color de fondo
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bordes
      ctx.strokeStyle = '#000'; // Color del borde
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Texto del solapín
      ctx.fillStyle = '#000'; // Color del texto
      ctx.font = '20px Arial';

      const maxLabelWidth = Math.max(
        ctx.measureText('Nombre:').width,
        ctx.measureText('ID:').width,
        ctx.measureText('Fecha:').width,
        ctx.measureText('Código de trabajador:').width
      );

      const columnX = [20, 20 + maxLabelWidth + 20]
      const labels = ['Nombre', 'Apellidos', 'ID', 'Código de trabajador']
      const values = [this.badgeData.solFirstName, this.badgeData.solLastName, this.badgeData.badgeId, this.badgeData.solWorkerCode]

    const photoHeight = 100; // Altura de la foto
    const photoY = 20; // Posición Y de la foto

    // Dibujar la foto (puedes reemplazar esto con la foto real del usuario)
    ctx.fillStyle = '#ccc'; // Color de fondo de la foto
    ctx.fillRect(20, photoY, 100, photoHeight);
    ctx.strokeRect(20, photoY, 100, photoHeight);

    const dataStartY = photoY + photoHeight + 20 
    ctx.fillStyle = '#333'; 
      for (let i = 0; i < labels.length; i++) {
        ctx.fillText(labels[i] + ':', columnX[0],dataStartY + i * 40); // Etiquetas
        ctx.fillText(values[i], columnX[1], dataStartY + i * 40); // Valores
      }
      // ctx.fillText(`Nombre: ${this.badgeData.solFirstName}`, 20, 40);
      // ctx.fillText(`Apelldios: ${this.badgeData.solLastName}`, 20, 40);
      // ctx.fillText(`ID: ${this.badgeData.badgeId}`, 20, 80);
      // ctx.fillText(`Codigo de Trabajador: ${this.badgeData.solWorkerCode}`, 20, 120);
      // Agrega más datos según sea necesario
    }

    } catch (error) {
      console.error(error)
    }
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  printBadge(){
    try {
      if(this.badgeGenerated){
        const printWindow = window.open('', '_blank')
      if(printWindow){
        const canvas = document.getElementById('badgeCanvas') as HTMLCanvasElement
      if(canvas){
      const imgData = canvas.toDataURL('image/png');
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimir Solapín</title>
            <style>
              body { text-align: center; }
              img { margin: 20px auto; display: block; }
            </style>
          </head>
          <body>
            <h1>Solapín</h1>
            <img src="${imgData}" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      }else{
        this.showAlert('Error al obtener la imagen canvas')
      }
      }else{
        this.showAlert('Error al abrir la nueva ventana.')
      }
      }else{
        console.log('Badge has not been generated')
      }
    } catch (error) {
      console.log(error)
    }
  }
  showAlert(message: string){
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000
    })
  }
}