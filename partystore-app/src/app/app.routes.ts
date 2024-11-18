import { Routes } from '@angular/router';
import { CrudPedidosComponent } from './components/crud-pedidos/crud-pedidos.component';
import { UsuariosComponent } from './components/crud-usuarios/crud-usuarios.component';

export const routes: Routes = [

    {path:"pedidos", component: CrudPedidosComponent},
    {path: "crud-usuario",component:UsuariosComponent}

    //rutas por defecto
    {path: " ", redirectTo:"pedidos", pathMatch: 'full'},
    {path:"**", redirectTo:"pedidos"}, //** representa cualquier otra ruta */
];
