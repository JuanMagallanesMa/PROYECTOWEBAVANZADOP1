import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/Producto';

@Component({
  selector: 'app-crud-product',
  standalone: true,
  imports: [],
  templateUrl: './crud-product.component.html',
  styleUrl: './crud-product.component.css'
})
export class CrudProductComponent implements OnInit{
createProducto() {
throw new Error('Method not implemented.');
}
updateProducto() {
throw new Error('Method not implemented.');
}
productoForm: any;
deleteProducto(arg0: any) {
throw new Error('Method not implemented.');
}
editProducto(_t31: any) {
throw new Error('Method not implemented.');
}
  productos: Producto[] = [];
selectedProducto: any;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }
}
