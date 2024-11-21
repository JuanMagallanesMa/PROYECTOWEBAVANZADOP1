
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

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
  ]
})
export class CrudPedidosComponent implements OnInit {
  // Control para el input del autocompletado
  myControl = new FormControl('');

  // Opciones disponibles para el autocompletado
  options: Usuario[] = [];

  // Propiedad para las opciones filtradas
  filteredOptions!: Observable<Usuario[]>;

  //constructor
  constructor(private servicioUsuario : UsuarioService){

  }
  ngOnInit() {
    
    this.getUsuarios();
  }
  getUsuarios():void{
    this.servicioUsuario.getUsuarios().subscribe((data:Usuario[])=>{
      this.options=data;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),  // Cuando el input está vacío, se muestran todas las opciones
        map(value => this._filter(value||''))  // Filtramos las opciones según el valor
      );
      console.log("Se muestra el autocomplete de usuarios");
    });
    
  }
  // Función de filtro para las opciones
  private _filter(value: string): Usuario[] {
    const filterValue = value.toLowerCase();  // Comparamos sin importar mayúsculas/minúsculas
    return this.options.filter(option => 
      option.nombreCompleto.toLowerCase().includes(filterValue) ||
      option.correo.toLowerCase().includes(filterValue)
    );
  }
}
