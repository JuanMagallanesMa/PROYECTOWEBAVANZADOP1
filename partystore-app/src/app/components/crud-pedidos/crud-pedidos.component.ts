
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../shared/table/table.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Producto, ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-crud-pedidos',
  standalone: true,
  templateUrl: './crud-pedidos.component.html',
  styleUrls: ['./crud-pedidos.component.css'],
  imports: [
    CommonModule,          
    ReactiveFormsModule,  
    MatAutocompleteModule,
    MatFormFieldModule,    
    MatInputModule, 
    TableComponent,
    MatPaginatorModule     
  ]
})
export class CrudPedidosComponent implements OnInit {
  // Control para el input del autocompletado
  myControl = new FormControl('');

  // Opciones disponibles para el autocompletado
  options: Usuario[] = [];

  // Propiedad para las opciones filtradas
  filteredOptions!: Observable<Usuario[]>;
  
  //datasource para la tabla
  dataSource = new MatTableDataSource<Usuario>;
  
  //definir las columnas
 displayedColumns: string[] = ['nombreCompleto', 'correo', 'telefono'];

  //constructor
  constructor(private servicioUsuario : UsuarioService){

  }
  
  ngOnInit() {
    this.cargarTabla();
    this.getUsuarios();
  }
  cargarTabla():void{
    this.servicioUsuario.getUsuarios().subscribe(data => { this.dataSource.data = data; });
  }

  getUsuarios():void{
    this.servicioUsuario.getUsuarios().subscribe((data:Usuario[])=>{
      this.options=data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),  // Cuando el input está vacío, se muestran todas las opciones
        map(value => this._filter(value||''))  // Filtramos las opciones según el valor
      );
      console.log("Se muestra el autocomplete de usuarios");
    });
    
  }
  // Función de filtro para las opciones
  private _filter(value: string): Usuario[] {
    const filterValue = value.toLowerCase();  // Comparamos sin importar mayúsculas/minúsculas
    return this.options.filter(option => 
      option.nombreCompleto.toLowerCase().includes(filterValue) ||
      option.correo.toLowerCase().includes(filterValue)
    );
  }
}
