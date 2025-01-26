import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromocionService } from '../../services/promocion.service';
import { PromocioneModel } from '../../interfaces/promocion-model';

@Component({
  selector: 'app-eliminar-promocion',
  standalone: true,
  imports: [],
  templateUrl: './eliminar-promocion.component.html',
  styleUrl: './eliminar-promocion.component.css'
})
export class EliminarPromocionComponent {

  constructor(
    private _dialogRef: MatDialogRef<EliminarPromocionComponent>,
    private _snackBar: MatSnackBar,
    private _servicePromocion: PromocionService,
    @Inject(MAT_DIALOG_DATA) public data: PromocioneModel
  ) { }

  onSubmit() {
    this._servicePromocion.eliminar(this.data.id!).subscribe({
      next: (success: boolean) => {
        if (success) {
          this._snackBar.open('Promoción eliminada exitosamente.', 'Cerrar', { duration: 3000 });
          this._dialogRef.close(true);
        } else {
          this._snackBar.open('Error al crear la promoción. Intente más tarde.', 'Cerrar', { duration: 3000 });
        }
      }
    });
  }

  onCancel() {
    this._dialogRef.close()
  }

}
