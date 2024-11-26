
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
import { HeaderPedido } from '../../models/HeaderPedido';
import { PedidosjsonService } from '../../services/pedidosjson.service';

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
  // Opciones o llamado a otros modelo
  header: HeaderPedido ;
  cantidad:number=1;
  total:number = 0;
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
    private servicioProducto: ProductoService,
    private servicioPedido: PedidosjsonService
  ) { 
    this.header = { 
      idHeaderPedido: 0, 
      //idUsuario: 0, 
      nombresCompletos: '', 
      cedula: '', 
      telefono: '', 
      //email: '', 
      provincia: '', 
      //ciudad: '', 
      //zip: '', 
      direccion: '', 
      //date: new Date(0), // Inicializa con la fecha mínima 
      Total: 0 };
    
  }
  ngOnInit() {
    this.getUsuarios();
    this.getZip();
    this.form = this.fb.group({
      
      pedidoNumber: ["", [Validators.required, Validators.pattern(/^(?:[1-9][0-9]{0,2}|1000)$/)]], 
      nombres: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]], 
      cedula: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      telefono: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      //email: ["", [Validators.required, Validators.email]],
       provincia: ["", Validators.required], 
       //ciudad: ["", Validators.required], postal: ["", Validators.required], 
       direccion: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,\.]+$/)]]


  });
  
    
    this.verCarrito();

  }
  onSubmit():void{

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
  verCarrito():void{
    this.product = this.servicioProducto.obtenerProductosCart();
    this.calcularTotal();
  }
  calcularTotal():void { 
    this.total = this.product.reduce((acc, prod) => acc + (prod.precio * this.cantidad), 0); 
  }
  addArticulo(prod: Producto):void{
    this.cantidad++;
    this.calcularTotal();
  }
  removeArticulo(prod: Producto):void{
    this.cantidad--;
    this.calcularTotal();
  }
  trackByFn(index: number, item: Producto): number { 
    return item.idProducto; 
  }
  agregarheader(): void { 
    if (this.form.valid) { 
      this.header = { 
        ...this.header, 
        idHeaderPedido: this.form.value.pedidoNumber, 
        nombresCompletos: this.form.value.nombres, 
        cedula: this.form.value.cedula, 
        telefono: this.form.value.telefono,
        //email: this.form.value.email, 
        provincia: this.form.value.provincia, 
        //ciudad: this.form.value.ciudad, 
        //zip: this.form.value.postal, 
        direccion: this.form.value.direccion, 
        //date: new Date(), 
        Total: this.total
      }; 
      this.servicioPedido.addHeaderPedido(this.header).subscribe(() => { 
        console.log('Header agregado:', this.header); 
      }, (err) => { 
        console.error('Error al agregar el header:', err); }); 
      }else { console.error('Formulario inválido'); 

      }
  }
}
