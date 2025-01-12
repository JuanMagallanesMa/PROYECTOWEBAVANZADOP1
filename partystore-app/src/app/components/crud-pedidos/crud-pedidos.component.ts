
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioButton } from '@angular/material/radio';
import { HeaderpedidoApiService } from '../../services/headerpedido-api.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatButtonModule  ,
    TableComponent,
    MatRadioButton,
    MatCheckboxModule,
  ]
})
export class CrudPedidosComponent implements OnInit , AfterViewInit{
  //obtener datos del formulario y guardarlo
  provincias = ["Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galápagos", "Guayas"]
  isEditMode:boolean=false;
  currentId!:number;
  //inicializacion del formgroup
  form!: FormGroup;
  estate:boolean=true;
  total:number=10;
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  
  headerPedido: HeaderPedido[]=[];
  
  //datasources para la tabla
  dataSourceHeader = new MatTableDataSource<HeaderPedido>(); 
  //definir las columnas a mostrar en la tabla
  displayedColumns: string[] = ['id', 'name', 'cedula','telefono', 'provincia', 'address','total', 'acciones'];
  columnAliases = {
    id: 'id', 
    name: 'Nombres', 
    cedula:'Cedula', 
    telefono: 'Telefono',
    provincia:'Provincia', 
    address:'Direccion',
    total:'Total', 
    acciones: 'Acciones' };
  //constructor con los servicios
  constructor(
    private fb: FormBuilder,
    private servicioHeaderPedido: HeaderpedidoApiService,
    private dialog: MatDialog
  ) { 
    
    
  }
  ngAfterViewInit(): void {
    
  }
  ngOnInit() {
   
    this.cargarHeader();
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]], 
      cedula: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      telefono: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      //email: ["", [Validators.required, Validators.email]],
       provincia: ["", Validators.required], 
       //ciudad: ["", Validators.required], postal: ["", Validators.required], 
       address: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,\.]+$/)]]
  });
  
    
   // this.verCarrito();

  }
  onSubmit():void{
    
    if(this.form.invalid){
      console.log("invalid")
      return;
    }
    const newHeaderPedido : HeaderPedido = this.form.value;
    if(this.isEditMode){
      newHeaderPedido.id = this.currentId;
      this.servicioHeaderPedido.updateHeaderPedido(newHeaderPedido).subscribe((updatepedido)=>{
        alert("Pedido editado");
        this.cargarHeader();
      });
    }else{
      this.servicioHeaderPedido.addHeaderPedido(newHeaderPedido).subscribe((updatepedido)=>{
        alert("Pedido agregado");
        this.cargarHeader();
      });
    }
    this.clearForm();
    
  }
  clearForm():void{
    this.form.reset({
      name: '', 
      cedula: '', 
      telephone: '', 
       provincia:'', 
       address:'',
    });
    this.currentId = 0;
    this.isEditMode = false;
  }
 
  /*verCarrito():void{
    this.servicioPedido.obtenerProductosCart().subscribe(header => { 
      
      this.header.productos = header; // Guarda los productos en el atributo productos de headerPedido 
      this.header.Total = this.calcularTotal(); // Calcula el total del pedido 
      console.log('Productos en el carrito:', this.header.productos); // Muestra el listado de productos en la consola
      console.log(this.header.Total)
    });
   
  }*/
  
  cargarHeader():void{
    this.servicioHeaderPedido.getHeaderPedido().subscribe((datos:HeaderPedido[])=>{
      this.dataSourceHeader.data = datos;
    });
  }
 /* calcularTotal():number { 
    return this.total = this.header.productos.reduce((acc, prod) => acc + prod.precio, 0); 
  }*/
  
  
  

/*
  agregarheader(): void { 
    
      if (this.form.valid) { 
        this.header = { 
          ...this.header, 
          id: this.form.value.pedidoNumber,
          nombresCompletos: this.form.value.nombres, 
          cedula: this.form.value.cedula, 
          telephone: this.form.value.telephone,
          provincia: this.form.value.provincia, 
          direccion: this.form.value.direccion, 
          
        }; 
        this.servicioPedido.addHeaderPedido(this.header).subscribe(() => { 
          console.log('Header agregado:', this.header); 
          this.cargarHeader();
        }, (err) => { 
          console.error('Error al agregar el header:', err); 
        }); 
      }else { console.error('Formulario inválido'); 
        
      }
    
    
    
  }
    */


  handleEdit(pedido: HeaderPedido) { 
    this.isEditMode = true;
    if(pedido && pedido.id){
      this.currentId= pedido.id;
    }else{
    console.log("Header o el id del header estan undefined");
   }
    this.form.setValue({
      
      name: pedido.name, 
      cedula: pedido.cedula, 
      telephone: pedido.telefono, 
       provincia:pedido.provincia, 
       address:pedido.address,
       Total:pedido.total
    });
    console.log('Editar header:', pedido);
  } 
  
  handleDelete(pedido: HeaderPedido) { 
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        titulo: 'Eliminación de Pedido',
        contenido: `¿Estás seguro de eliminar el pedido ${pedido.id} de ${pedido.name}?`,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        this.servicioHeaderPedido.desactiveHeaderPedido(pedido).subscribe(() => {
          this.cargarHeader();
        });
      }else if(result ==="cancelar"){
        
      }
    });

    
    console.log('Eliminar usuario:', pedido);
  }
  search(searchInput:HTMLInputElement){
    if(searchInput.value){
      this.servicioHeaderPedido.getHeaderPedidoSearch(searchInput.value).subscribe((datos:HeaderPedido[])=>{
        this.dataSourceHeader.data = datos;
      });
    }else{
      this.cargarHeader();
    }
  }
}
