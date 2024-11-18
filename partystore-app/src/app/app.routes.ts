import { Routes } from '@angular/router';
import { CrudPedidosComponent } from './components/crud-pedidos/crud-pedidos.component';
import { UsuariosComponent } from './components/crud-usuarios/crud-usuarios.component';

export const routes: Routes = [

    {path:"pedidos", component: CrudPedidosComponent},
    {path: "usuario",component:UsuariosComponent},

    //rutas por defecto
    {path: " ", redirectTo:"usuario", pathMatch: 'full'},
    {path:"**", redirectTo:"usuario"}, //** representa cualquier otra ruta */
];
