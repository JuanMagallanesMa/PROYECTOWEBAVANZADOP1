import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';
export interface DialogData{
  titulo: string;
  contenido: string;
}

@Component({
  selector: 'app-my-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButton],
  templateUrl: './my-dialog.component.html',
  styleUrl: './my-dialog.component.css'
})
export class MyDialogComponent {
  // tiene que tener acciones
  constructor(public dialogRef: MatDialogRef<MatDialogModule>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

  }
  // eror de logica por no pasarle el valor de result
  onAceptar():void{
    this.dialogRef.close("aceptar");  // cierra la ventana de dialogo
  }

  onCancelar():void{
    this.dialogRef.close("cancelar"); // cierra la ventana de dialogo
  }
}
