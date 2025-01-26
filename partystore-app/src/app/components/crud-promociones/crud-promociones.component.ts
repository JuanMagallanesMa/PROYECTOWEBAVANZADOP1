import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { PromocioneModel } from './interfaces/promocion-model';
import { PromocionService } from './services/promocion.service';
import { CrearPromocionComponent } from './components/crear-promocion/crear-promocion.component';
import { EditarPromocionComponent } from './components/editar-promocion/editar-promocion.component';
import { DetallePromocionComponent } from './components/detalle-promocion/detalle-promocion.component';
import { EliminarPromocionComponent } from './components/eliminar-promocion/eliminar-promocion.component';

@Component({
  selector: 'app-crud-promociones',
  standalone: true,
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  templateUrl: './crud-promociones.component.html',
  styleUrls: ['./crud-promociones.component.css']
})
export class CrudPromocionesComponent implements OnInit, AfterViewInit {

  public loading = signal<boolean>(false)

  displayedColumns: string[] = ['nombre', 'descuentoPorcentaje', 'fechaFin', 'acciones'];
  dataSource = new MatTableDataSource<PromocioneModel>();
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _service: PromocionService
  ) { }

  ngOnInit(): void { 
    this.load();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = "Items por Página ";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAdd() {
    this._dialog.open(CrearPromocionComponent, {
      autoFocus: false,
      disableClose: true,
      width: '560px'
    }).afterClosed().subscribe(() => this.load())
  }

  openEdit(data: PromocioneModel) {
    this._dialog.open(EditarPromocionComponent, {
      autoFocus: false,
      disableClose: true,
      width: '560px',
      data: data
    }).afterClosed().subscribe(() => this.load())
  }

  openDetails(data: PromocioneModel) {
    this._dialog.open(DetallePromocionComponent, {
      autoFocus: false,
      disableClose: true,
      width: '560px',
      data: data
    }).afterClosed().subscribe(() => this.load())
  }
  
  openEliminar(data: PromocioneModel) {
    this._dialog.open(EliminarPromocionComponent, {
      autoFocus: false,
      disableClose: true,
      width: '560px',
      data: data
    }).afterClosed().subscribe(() => this.load())
  }

  private load() {
    this.loading.update(() => true);
    this._service.obtenerTodos().subscribe({
      next: (data: PromocioneModel[]) => this.dataSource.data = data.reverse(),      
      complete: () => this.loading.update(() => false),
    });
  }

}