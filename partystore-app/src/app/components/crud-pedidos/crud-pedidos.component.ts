
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { DetailPedido } from '../../models/DetailPedido';
import { HeaderPedido } from '../../models/HeaderPedido';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-crud-pedidos',
  standalone: true,
  imports: [MatFormField, MatLabel, MatPaginator, MatTableModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './crud-pedidos.component.html',
  styleUrl: './crud-pedidos.component.css'
})
export class CrudPedidosComponent implements OnInit , AfterViewInit {
  form!:FormGroup;
  usuarios: Usuario[]=[] ;
  
  constructor(private usuarioService: UsuarioService) {}

  //datasource (fuente de datos para la tabla detail Pedido)
  dataSourceDetailPedido = new MatTableDataSource<DetailPedido>();
   //datasource (fuente de datos para la tabla header Pedido)
   dataSourceHeaderPedido = new MatTableDataSource<HeaderPedido>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.ngAfterViewInit();
    this.obtenerUsuarios();
  }
  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSourceDetailPedido.paginator = this.paginator;
  }
  
  onSubmit():void{

  }
}
