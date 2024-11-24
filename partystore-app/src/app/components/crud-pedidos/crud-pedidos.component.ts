
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {ChangeDetectionStrategy,  signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule,  Validators} from '@angular/forms';

import {merge} from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/Usuario';
import { TableComponent } from '../shared/table/table.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { map, Observable, startWith } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { Producto } from '../../models/Producto';
import { ProductoService } from '../../services/producto.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    MatPaginatorModule,
    MatFormField,
    FormsModule,
    MatSelect,
    MatListModule, MatDividerModule, DatePipe,
    MatCardModule,
    MatIconModule,
    MatButtonModule  
  ]
})
export class CrudPedidosComponent implements OnInit {
  //obtener datos del formulario y guardarlo
  provinciaSeleccionada: string = '';
  // Control para el input del autocompletado
  myControl = new FormControl('');
  myControlzip = new FormControl('');
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  //inicializacion del formgroup
  form!: FormGroup;
  //error de mensaje
  errorMessage = signal('');
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  // Opciones o llamado a otros modelos
  product: Producto[]=[];
  options: Usuario[] = [];
  optionsZIP: string[] = ['090101', '090102', '091906', '170102', '170121', '171002'];
  // Propiedad para las opciones filtradas
  filteredOptionsZIP!: Observable<string[]>;
  filteredOptions!: Observable<Usuario[]>;
  //datasources para la tabla
  dataSource = new MatTableDataSource<Usuario>(); 
  //definir las columnas a mostrar en la tabla
  displayedColumns: string[] = [
    'nombreCompleto', 
    'correo', 
    'telefono', 
    'acciones'
  ];
  //darle un nombre visual a cada columna definida
  columnAliases = { 
    nombreCompleto: 'Nombre Completo', 
    correo: 'Correo Electrónico', 
    telefono: 'Teléfono', 
    acciones:'Acciones' 
  }; 
  //constructor con los servicios
  constructor(
    private servicioUsuario : UsuarioService, 
    private fb: FormBuilder,
    private servicioProducto: ProductoService
  ) { 
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
  ngOnInit() {
    this.getUsuarios();
    this.getZip();
    this.getProductos();
    this.form = this.fb.group({
      usuario: ["", Validators.required] ,
      nombres: ["",[Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-z0-9]+$/)]],
      cedula: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      telefono: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      provincia: ["", Validators.required],
      ciudad: ["",Validators.required],
      postal: ["", [Validators.required,Validators.pattern(/^\d{6}$/)]],
      direccion: ["", [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-z0-9]+$/)]],                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
    });
  }
  onSubmit():void{

  }

  //mensaje de error  
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  //obtener productos
  getProductos(): void {
    this.servicioProducto.getProductos().subscribe((data: Producto[]) => {
      this.product = data;
    });
  }
  //obtener usuarios
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
  //obtener codigo postal
  getZip():void{
    this.filteredOptionsZIP = this.myControlzip.valueChanges.pipe(
      startWith(''),
      map(value => this._filterZip(value || ''))
    );
  }
  // Función de filtro para las opciones
  private _filter(value: string): Usuario[] {
    const filterValue = value.toLowerCase();  // Comparamos sin importar mayúsculas/minúsculas
    return this.options.filter(option => 
      option.nombreCompleto.toLowerCase().includes(filterValue) ||
      option.correo.toLowerCase().includes(filterValue)
    );
  }
  private _filterZip(value: string): string[] {
    const filterValuezip = value.toLowerCase();
    return this.optionsZIP.filter(optionzip => optionzip.toLowerCase().includes(filterValuezip));
  }
  //funciones para editar y eliminar
  handleEdit(usuario: Usuario) { 
    // Lógica para editar el usuario 
    console.log('Editar usuario:', usuario); 
  } 
  handleDelete(usuario: Usuario) { 
    // Lógica para eliminar el usuario 
    console.log('Eliminar usuario:', usuario);
  }
  
}
