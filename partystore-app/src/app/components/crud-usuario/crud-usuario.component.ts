import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../shared/table/table.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioApiService } from '../../services/usuario-api.service';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogComponent } from '../shared/my-dialog/my-dialog.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioButton } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-crud-usuario',
  standalone: true,
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
      MatCheckboxModule
    ],
  templateUrl: './crud-usuario.component.html',
  styleUrls: ['./crud-usuario.component.css']
})
export class CrudUsuarioComponent {
  usuarios: Usuario[] = [];
  form!:FormGroup;
  isEditMode:boolean=false;
  currentId!:number; 

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioApiService,
    private mydialog: MatDialog) {}
  dataSource = new MatTableDataSource<Usuario>();
  
  //definir las columnas
  displayedColumns: string[] = ['id','name', 'email', 'telephone', 'isAviable', 'acciones'];  
  columnAliases = { id:'id',name: 'Nombre Completo', email: 'Correo Electrónico', telephone: 'Teléfono',isAviable:'Estado' ,acciones:'Acciones' }; 
  
  search(searchInput: HTMLInputElement){
    if(searchInput.value){ // searchInput.value es lo que el usuario escribio en la caja de texto
      //buscar
      this.usuarioService.getUsuarioSearch(searchInput.value).subscribe((datos:Usuario[]) => {
        this.dataSource.data = datos;
      });

    }else{ //listar todas las peliculas
      this.cargarUsuarios();
    }
  }
  ngOnInit() {
    this.cargarUsuarios();
    this.form = this.fb.group({
      name: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]], 
      telephone: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      isAviable: [true],
      role: ["", Validators.required]
      });
  }
  onSubmit(){
    
    //revisar si el formulario es valido
    if(this.form.invalid){
      console.log("invalid");
      return;
    }
    //obtener los datos de los controles del formulario
    const newUser:Usuario =this.form.value;

    if(this.isEditMode){ // editar
      newUser.id= this.currentId;
      this.usuarioService.updateUsuario(newUser).subscribe(()=>{
        alert("Pelicula fue editada exitosamente");
        this.cargarUsuarios();//actualizar el datasource de la table de peliculas
      });

    }else{ //agregar
      this.usuarioService.addUsuario(newUser).subscribe(()=>{
        alert("Pelicula fue agregada exitosamente");
        this.cargarUsuarios();
      });
    }
    this.clearForm();
  }
  cargarUsuarios(): void {
    this.usuarioService.getUsuario().subscribe(usuarios => {
      this.dataSource.data = usuarios; 
    });
  }



  clearForm(): void {
    this.form.reset({
      
      name: '',
      email: '',
      password: '',
      telephone: '',
      role: 'cliente',

    });
    this.currentId=0;
  this.isEditMode = false;
  }

 





handleEdit(usuario: Usuario) { 
  this.isEditMode =true;
   if(usuario && usuario.id){
    this.currentId = usuario.id;
   }else{
    console.log("Usuario o id de Usuario estan undefined");
   }

   this.form.setValue({
    name: usuario.name,
      email:usuario.email,
      password:usuario.password,
      telephone: usuario.telephone,
      role: usuario.role,
      isAviable:usuario.isAviable
   });
} 

  handleDelete(usuario: Usuario) { 
    const dialogRef= this.mydialog.open(MyDialogComponent,{
      data:{
        titulo:"Eliminacion de usuario",
        contenido:"estas seguro de eliminar el usuario " +usuario.name + "?" 
      },
    }); //abrir la ventana de dialogo
    
    dialogRef.afterClosed().subscribe(result => {
      if(result==="aceptar"){ // que quiero que suceda si dio click en aceptar
        this.usuarioService.desactiveUsuario(usuario).subscribe(() => {
          alert("Eliminado exitosamente");
          this.cargarUsuarios(); // para que se actualice el dataSource
        });
      }else if(result ==="cancelar"){// que quiero que suceda si dio click en cancelar
        
      }
    });
    
  }
}

