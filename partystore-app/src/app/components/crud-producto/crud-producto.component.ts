import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../models/Producto'; 
import { TableComponent } from '../shared/table/table.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { ProductoApiService } from '../../services/producto-api.service';
import { Categoria } from '../../models/Categoria';
import { CategoriaApiService } from '../../services/categoria-api.service';

@Component({
  selector: 'app-crud-producto', 
  standalone: true,
  templateUrl: './crud-producto.component.html', 
  styleUrls: ['./crud-producto.component.css'],  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    TableComponent,
    FormsModule,
  ],
})
export class CrudProductoComponent implements OnInit { 
  form!: FormGroup;
  isEditMode = false;
  currentID!: number;
  dataSource = new MatTableDataSource<Producto>(); 
  searchValue: string = ''; 
  categoria!: Categoria[];
  selectedValueCategoria: string = '';
  displayedColumns: string[] = [
    'nombre', 
    'descripcion', 
    'precio', 
    'categoryId', 
    'isActive', 
    'stock', 
    'imagen', 
    'acciones'
  ]; 
  columnAliases = {
    nombre: 'Nombre',
    descripcion: 'Descripción',
    precio: 'Precio',
    categoryId: 'Categoría',
    isActive: 'Activo',
    stock: 'Stock',
    imagen: 'Imagen',
    acciones: 'Acciones',
  };

  constructor(
    private productoService: ProductoApiService, 
    private categoriaService: CategoriaApiService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getProductos();
    this.getcategoryId();
  
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(5)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      isActive: ['true', Validators.required],
      categoryId: ['', Validators.required], 
      imagen: ['', Validators.required],
    });
  }
  onCategoryChange(){

  }
  //Obtener los productos desde el servicio
  getProductos(): void {
    this.productoService.obtenerProductos().subscribe((datos: Producto[])=>{
      this.dataSource.data=datos;
    });
  }

  getcategoryId(): void {
    this.categoriaService.obtenerCategorias().subscribe((datos: Categoria[])=>{
      this.categoria=datos;
    });
  }

  //Eliminar un producto
  eliminar(producto: Producto): void{
    const dialogRef = this.dialog.open(MyDialogComponent,{
      data: {
        titulo: 'Eliminación de Producto',
        contenido: `¿Estás seguro de eliminar la categoría ${producto.nombre}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result)=>{
      if(result==='aceptar'){
        this.productoService.eliminarProducto(producto.id).subscribe(()=>{
          alert('Producto eliminado exitosamente');
          this.getProductos();
        });
      }
    });
  }

  //Editar un producto
  editar(producto: Producto): void{
    this.isEditMode = true;
    this.currentID = producto.id;

    this.form.setValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      isActive: producto.isActive,
      precio: producto.precio,
      imagen: producto.imagen,
      categoryId : producto.category?.nombre,
      stock : producto.stock,
    });
  }

    //Enviar formulario para crear o actualziar
    onsubmit(): void{
      console.log('Formulario:', this.form.value);
      if(this.form.invalid){
        alert('Formulario inválido');
        return;
      }

      const nuevoProducto: Producto={
        ...this.form.value,
       
      };
      console.log(nuevoProducto);

     if(this.isEditMode){
        this.productoService.actualizarProducto(nuevoProducto).subscribe(()=>{
          alert('Producto actualizado');
          this.getProductos();
         this.clearForm();
        });
      }else{
        this.productoService.crearProducto(nuevoProducto).subscribe(()=>{
        alert();
        this.getProductos();
        this.clearForm();
       });
     }
   }

    //Limpiar el formulario
    clearForm(): void{
      this.form.reset({
        nombre: '',
        descripcion: '',
        isActive: 'activo',
        precio: '',
        imagen: '',
        categoryId: '',
        stock: '',
      });
      this.currentID = 0;
      this.isEditMode= false;
    }

    applyFilter(): void{
      this.dataSource.filter = this.searchValue.trim().toLowerCase();
      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage();
      }
    }

}