
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
    MatListModule, MatDividerModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule  ,
    TableComponent,
  
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
      
       provincia: ["", Validators.required], 
       isActive: [true],
       address: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
       
    });
  
    
   // this.verCarrito();

  }
  loadCart(): void {
    this.cart = this.cartService.getCart();
    this.updateCartTotal();
  }
  calculateTotal(): void {
    this.cartTotal = this.cart.reduce((sum, item) => sum + item.subtotal, 0);
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
 

  handleEdit(pedido: HeaderPedido) { 
    this.isEditMode = true;
    
    if (pedido && pedido.id) {
      this.currentId = pedido.id;
    } else {
      console.error("HeaderPedido o el ID del HeaderPedido están undefined");
      return;
    }
  
    // Establecer los valores del formulario
    this.form.setValue({
      name: pedido.name,
      cedula: pedido.cedula,
      telefono: pedido.telefono,
      provincia: pedido.provincia,
      address: pedido.address,
      isActive: pedido.isActive,
    });
  
    // Asegurar que se conserve el total al editar
    this.cartTotal = pedido.total || 0;
  
    console.log('Editar header:', pedido);
  } 
  
  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Formulario inválido:', this.form.errors);
      return;
    }
    const cartSnapshot = [...this.cart]; // Crear una copia del carrito
    console.log('Snapshot del carrito:', cartSnapshot);

    const newHeaderPedido: HeaderPedido = {
      ...this.form.value,
      total: this.cartTotal, // Usar el valor actual del total calculado
    };
  
    if (this.isEditMode) {
      if (this.cartTotal === 0) {
        alert('No se puede guardar un pedido con total 0.');
        return;
      }
  
      newHeaderPedido.id = this.currentId;
      this.servicioHeaderPedido.updateHeaderPedido(newHeaderPedido).subscribe(() => {
        alert('Pedido editado correctamente.');
        this.cargarHeader();
      });
    } else {
      if (this.cartTotal === 0) {
        alert('El carrito está vacío. Agrega productos antes de guardar.');
        return;
      }
  
      this.servicioHeaderPedido.addHeaderPedido(newHeaderPedido).subscribe((updatePedido) => {
        const orderDetails = cartSnapshot.map((item) => ({
          orderId: updatePedido.id,
          isActive: true,
          cantidad: item.cantidad,
          productId: item.productId,
          subtotal: item.subtotal,
        }));
  
        forkJoin(orderDetails.map((detail) => this.servicioDetailPedido.addDetailPedido(detail))).subscribe(
          () => {
            alert('Pedido agregado correctamente.');
            this.cartService.clearCart();
            this.loadCart();
            this.cargarHeader();
          },
          (error) => {
            console.error('Error al guardar los detalles del pedido:', error);
            alert('Hubo un error al guardar los detalles del pedido.');
          }
        );
      });
    }
  
    this.clearForm();
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
  handleView(detalle: HeaderPedido): void {
    // Reinicia los estados antes de realizar la llamada
    this.viewOrderDetail = false;
    this.isEmpty = false;
    this.dataSourceDetail.data = [];
  
    this.servicioDetailPedido.getOrderDetailsByOrderId(detalle.id).subscribe(
      (datos: DetailPedido[]) => {
        if (datos && datos.length > 0) {
          // Si los datos no están vacíos, se asignan al dataSource
          this.viewOrderDetail = true;
          this.isEmpty = false; // Asegurarse de que no se marque como vacío
          this.dataSourceDetail.data = datos;
        } else {
          // Si los datos están vacíos
          this.viewOrderDetail = true;
          this.isEmpty = true;
          console.log('No se encontraron detalles para esta orden.');
        }
      },
      (err) => {
        // Manejo de errores, si la llamada falla
        this.viewOrderDetail = true; // Mostrar la vista de detalle incluso si hay error
        this.dataSourceDetail.data = [];
        this.isEmpty = true; // Marcar como vacío para mostrar el mensaje correspondiente
  
        if (err.status === 404) {
          console.log('No se encontraron detalles para esta orden (404)');
        } else {
          console.error('Error al obtener los detalles de la orden:', err);
        }
      }
    );
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
