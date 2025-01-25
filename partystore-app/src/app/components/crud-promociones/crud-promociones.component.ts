import { Component, OnInit } from '@angular/core';
import { PromocionesService } from '../../services/promociones.service';
import { Promociones } from '../../models/Promociones';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from '../../models/Categoria';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TableComponent } from '../shared/table/table.component';
import { CategoriaApiService } from '../../services/categoria-api.service';
import { MatDialog } from '@angular/material/dialog';
import { Producto } from '../../models/Producto';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoApiService } from '../../services/producto-api.service';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-crud-promociones',
  standalone: true,
  imports: [CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatRadioModule,
      TableComponent,
      FormsModule,
      MatDatepickerModule
      
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './crud-promociones.component.html',
  styleUrls: ['./crud-promociones.component.css']
})
export class CrudPromocionesComponent implements OnInit{
  form!: FormGroup;
    isEditMode = false;
    currentID!: number;
    dataSource = new MatTableDataSource<Promociones>(); 
    searchValue: string = ''; 
    categoria!: Categoria[];
  
    displayedColumns: string[] = ['nombre', 'descripcion', 'isActive', 'descuentoPorcentaje','id_categoria','fechaFin','acciones'  ]; 
    columnAliases = {
      nombre: 'Nombre',
      descripcion: 'Descripción',

      id_categoria: 'Categoría',
      isActive: 'Estado',
      descuentoPorcentaje: 'Descuento',
      fechaFin:'Fecha Finalizar',
      acciones: 'Acciones',
      
    };
    categoriasDisponibles: any;
    activoSeleccionado: boolean = false;
    inactivoSeleccionado: boolean = false;
  
    constructor(
      private promoService: PromocionesService, //Servicio Actualizado
      private categoryService:CategoriaApiService,
      private fb: FormBuilder,
      private dialog: MatDialog,
    ) {
      this.form = this.fb.group({
        isActive: [[]],
      });
    }
  
    ngOnInit(): void {
      this.getPromociones();
      this.getCategoria();
  
      this.form = this.fb.group({
        nombre: ['', [Validators.required]],
        descripcion: ['', [Validators.required]],
        descuentoPorcentaje:['',Validators.required],
        categoria: ['', Validators.required], 
        fechaFin:['', Validators.required],
      });
  
     
    }
  
    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.searchValue = filterValue.trim().toLowerCase();
  
      
      this.dataSource.filter = this.searchValue; 
    }
  
    getPromociones(): void {
      this.promoService.getPromociones().subscribe((datos: Promociones[]) => {
        this.dataSource.data = datos;
      });
    }
  
    getCategoria(): void {
      this.categoryService.obtenerCategorias().subscribe((datos: Categoria[]) => {
        this.categoria = datos;
      });
    }
  
    eliminar(promo: Promociones): void {
      const dialogRef = this.dialog.open(MyDialogComponent,{
        data:{
          titulo: 'Eliminación de Promocion',
          contenido: `¿Estás seguro de eliminar la promocion ${promo.nombre}?`,
        },
      });
      
      dialogRef.afterClosed().subscribe((result)=>{
        if(result === 'aceptar'){
          this.promoService.eliminarPromocion(promo.id).subscribe(()=>{
            alert('Producto eliminado exitosamente');
            this.getPromociones();
          });
        }
      });
    }
  
    editar(producto: Promociones): void {
      this.isEditMode = true;
      this.currentID = producto.id; 
  
      this.form.setValue({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        descuentoPorcentaje:producto.descuentoPorcentaje,
        
        isActive: producto.isActive,
        id_categoria: producto.id_categoria,
      });
    }
  
    onSubmit(): void {
      if (this.form.invalid) {
        alert('Formulario inválido');
        return;
      }
  
      const nuevoProducto: Promociones = this.form.value;
      if (this.isEditMode) {
        nuevoProducto.id = this.currentID; 
        this.promoService.actualizarPromocion(nuevoProducto).subscribe(() => {
          alert('Producto actualizado');
          this.getPromociones();
          this.clearForm();
        });
      } else {
        this.promoService.crearPromocion(nuevoProducto).subscribe(() => {
          alert('Producto creado');
          this.getPromociones();
          this.clearForm();
        });
      }
    }
  
    clearForm(): void {
      this.form.reset({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        isActive: 'activo',
        categoria: '',
        imagen:'',
      });
      this.currentID = 0;
      this.isEditMode = false;
    }
}

 
