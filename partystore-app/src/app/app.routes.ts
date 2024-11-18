import { Routes } from '@angular/router';
import { CrudPedidosComponent } from './components/crud-pedidos/crud-pedidos.component';

export const routes: Routes = [

    {path:"pedidos", component: CrudPedidosComponent},
    

    //rutas por defecto
    {path: " ", redirectTo:"pedidos", pathMatch: 'full'},
    {path:"**", redirectTo:"pedidos"}, //** representa cualquier otra ruta */
];
