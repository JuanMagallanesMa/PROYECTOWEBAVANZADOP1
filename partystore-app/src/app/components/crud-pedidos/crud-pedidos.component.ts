
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ChangeDetectionStrategy,  signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { FormsModule,  Validators} from '@angular/forms';

import {merge} from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { TableComponent } from '../shared/table/table.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { map, Observable, startWith } from 'rxjs';
import { MatSelect } from '@angular/material/select';

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
    TableComponent  ,
    MatPaginatorModule,
    MatFormField,
    FormsModule,
    MatSelect    
  ]
})
export class CrudPedidosComponent implements OnInit {
  // Control para el input del autocompletado
  myControl = new FormControl('');
 form!: FormGroup;
  // Opciones disponibles para el autocompletado
  options: Usuario[] = [];

  // Propiedad para las opciones filtradas
  filteredOptions!: Observable<Usuario[]>;
  
  //datasource para la tabla
  dataSource = new MatTableDataSource<Usuario>();
  
  //definir las columnas
  displayedColumns: string[] = ['nombreCompleto', 'correo', 'telefono', 'acciones']; // No incluir 'acciones' aquí 
  columnAliases = { nombreCompleto: 'Nombre Completo', correo: 'Correo Electrónico', telefono: 'Teléfono', acciones:'Acciones' }; 

  readonly email = new FormControl('', [Validators.required, Validators.email]);
 
  errorMessage = signal('');
  constructor(private servicioUsuario : UsuarioService) { 
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  ngOnInit() {
    
    this.getUsuarios();
  }

  onSubmit():void{

  }
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  getUsuarios(): void {
    this.servicioUsuario.getUsuarios().subscribe((data: Usuario[]) => {
      this.options = data;
      this.dataSource.data = data; 
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),  // Cuando el input está vacío, se muestran todas las opciones
        map(value => this._filter(value || ''))  // Filtramos las opciones según el valor
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

  handleEdit(usuario: Usuario) { 
    // Lógica para editar el usuario 
    console.log('Editar usuario:', usuario); 
  } 

  handleDelete(usuario: Usuario) { 
    // Lógica para eliminar el usuario 
    console.log('Eliminar usuario:', usuario);
  }
}
