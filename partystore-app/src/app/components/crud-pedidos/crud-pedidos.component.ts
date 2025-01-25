
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormsModule,  Validators} from '@angular/forms';

import { TableComponent } from '../shared/table/table.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderPedido } from '../../models/HeaderPedido';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatRadioButton } from '@angular/material/radio';
import { HeaderpedidoApiService } from '../../services/headerpedido-api.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../interface/CartItem';
import { DetailpedidoApiService } from '../../services/detailpedido-api.service';
import { forkJoin } from 'rxjs';
import { DebugTracingFeature } from '@angular/router';
import { DetailPedido } from '../../models/DetailPedido';

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
    MatTableModule
    
  ]
})
export class CrudPedidosComponent implements OnInit , AfterViewInit{
  //obtener datos del formulario y guardarlo
  provincias = ["Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galápagos", "Guayas"]
  isEditMode:boolean=false;
  currentId!:number;
  viewOrderDetail:boolean = false;
  isEmpty:boolean =false;
  //inicializacion del formgroup
  form!: FormGroup;
  estate:boolean=true;
  cart : CartItem[]=[];
  cartTotal = 0;

  displayedColumnsCart: string[] = ['nombre', 'precio', 'cantidad', 'subtotal', 'acciones'];
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  
  headerPedido: HeaderPedido[]=[];
  
  //datasources para la tabla
  dataSourceHeader = new MatTableDataSource<HeaderPedido>(); 
  dataSourceDetail = new MatTableDataSource<DetailPedido>();
  //definir las columnas a mostrar en la tabla
  displayedColumns: string[] = ['id', 'name', 'cedula','telefono', 'provincia', 'address','total','isActive', 'acciones', 'view'];
  columnAliases = {
    id: 'id', 
    name: 'Nombres', 
    cedula:'Cedula', 
    telefono: 'Telefono',
    provincia:'Provincia', 
    address:'Direccion',
    total:'Total', 
    isActive: 'Estado',
    acciones: 'Acciones',
    view: 'View', 
  };
  displayedColumnsDetail: string[] = ['id', 'orderId', 'isActive','cantidad', 'productId', 'subtotal', 'accionesdetail'];
  columnAliasesDetail = {
    id: 'id', 
    orderId: 'Order', 
    isActive:'Estado', 
    cantidad: 'Cantidad',
    productId:'ProductId', 
    subtotal:'Subtotal',
    accionesdetail: 'Acciones',
    
  };
  //constructor con los servicios
  constructor(
    private fb: FormBuilder,
    private servicioHeaderPedido: HeaderpedidoApiService,
    private dialog: MatDialog,
    private cartService: CartService,
    private servicioDetailPedido: DetailpedidoApiService
  ) { 
    this.cart = this.cartService.getCart(); // Aquí obtienes el carrito
    this.calculateTotal();

    
  }
  ngAfterViewInit(): void {
    
  }

  ngOnInit() {
   this.loadCart();
   
    this.cargarHeader();
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]], 
      cedula: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      telefono: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      //email: ["", [Validators.required, Validators.email]],
       provincia: ["", Validators.required], 
       isActive: [true],
       address: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
       //total: [{ value: this.servicioCart.getTotal(), disabled: true }]
    });
  
    
   // this.verCarrito();

  }
 
  calculateTotal(): void {
    this.cartTotal = this.cart.reduce((sum, item) => sum + item.subtotal, 0);
  }
  onSubmit():void{
    
    if(this.form.invalid){
      console.log("invalid")
      return;
    }
    const newHeaderPedido: HeaderPedido = {
      ...this.form.value,
      total: this.cartTotal, 
    };
    if(this.isEditMode){
      newHeaderPedido.id = this.currentId;
      this.servicioHeaderPedido.updateHeaderPedido(newHeaderPedido).subscribe((updatepedido)=>{
        alert("Pedido editado");
        this.cargarHeader();
      });
    }else{
      this.servicioHeaderPedido.addHeaderPedido(newHeaderPedido).subscribe((updatepedido) => {
        const orderDetails = this.cart.map((item) => ({
          orderId: updatepedido.id, // ID del pedido recién creado
          isActive: true,
          cantidad: item.cantidad,
          productId: item.productId,
          subtotal: item.subtotal,
        }));
  
        // Utiliza forkJoin para manejar todas las solicitudes de detalle
        const detailRequests = orderDetails.map((detail) =>
          this.servicioDetailPedido.addDetailPedido(detail)
        );
  
        forkJoin(detailRequests).subscribe(
          () => {
            alert("Pedido agregado con todos los detalles");
            this.cartService.clearCart(); // Limpia el carrito después de guardar
            this.loadCart();
            this.cargarHeader();
          },
          (error) => {
            console.error("Error al guardar los detalles del pedido:", error);
            alert("Hubo un error al guardar los detalles del pedido.");
          }
        );
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
       total:0 
    });
    this.currentId = 0;
    this.isEditMode = false;
    this.cartService.clearCart();
    this.loadCart();
  }
  removeFromCart(productId: number){
    if (productId === undefined || productId === null) {
      console.error('Product ID is undefined or null');
      return;
    }

    this.cartService.removeFromCart(productId);
    
    this.loadCart(); // Recargar el carrito después de eliminar
  }

  
  cargarHeader():void{
    this.servicioHeaderPedido.getHeaderPedido().subscribe((datos:HeaderPedido[])=>{
      this.dataSourceHeader.data = datos;
    });
  }
  loadCart(): void {
    this.cart = this.cartService.getCart();
    this.updateCartTotal();
  }

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
      telefono: pedido.telefono, 
       
       address:pedido.address,
       provincia:pedido.provincia, 
       isActive:pedido.isActive,
       //total:this.servicioCart.getTotal()
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
  updateCartTotal(): void {
    this.cartTotal = this.cart.reduce((total, item) => total + item.subtotal, 0); // Calcular subtotal
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
  handleView(detalle: HeaderPedido) {
    this.viewOrderDetail = true;
    this.servicioDetailPedido.getOrderDetailsByOrderId(detalle.id).subscribe((datos: DetailPedido[]) => {
      if (datos && datos.length > 0) {
        // Si los datos no están vacíos, se asignan al dataSource
        this.dataSourceDetail.data = datos;
      } else {
        // Si los datos están vacíos, manejar la situación (por ejemplo, mostrar un mensaje)
        this.dataSourceDetail.data = []; // Puede asignar un array vacío o mostrar un mensaje de "No se encontraron detalles"
        console.log('No se encontraron detalles para esta orden.');
        // También puedes mostrar un mensaje en la UI si lo deseas
      }
    }, err => {
      // Manejo de errores, si la llamada falla
      if (err.status === 404) {
        // Si se recibe un 404 Not Found
        this.dataSourceDetail.data = [];
        this.isEmpty = true; // Cambiar a true si no se encuentran detalles
        console.log('No se encontraron detalles para esta orden (404)');
      } else {
        // Si hay otros errores
        this.dataSourceDetail.data = [];
        this.isEmpty = true; // Cambiar a true por error
        console.error('Error al obtener los detalles de la orden:', err);
      }
    });
  }
  
  
  handleDeleteDetail(detalle: DetailPedido){
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        titulo: 'Eliminación de Pedido',
        contenido: `¿Estás seguro de eliminar el pedido ${detalle.id} ?`,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'aceptar') {
        this.servicioDetailPedido.desactiveDetailPedido(detalle).subscribe(() => {
          
        });
      }else if(result ==="cancelar"){
        
      }
    });

    
    console.log('Eliminar usuario:', detalle);
  }
  
}
