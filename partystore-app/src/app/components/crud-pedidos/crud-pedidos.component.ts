
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
  //definir las columnas a mostrar en la tabla
  displayedColumns: string[] = ['id', 'name', 'cedula','telefono', 'provincia', 'address','total','isActive', 'acciones'];
  columnAliases = {
    id: 'id', 
    name: 'Nombres', 
    cedula:'Cedula', 
    telefono: 'Telefono',
    provincia:'Provincia', 
    address:'Direccion',
    total:'Total', 
    isActive: 'Estado',
    acciones: 'Acciones' };
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
  saveOrder(): void {
    // Lógica para guardar el pedido
    console.log('Pedido guardado');
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
}
