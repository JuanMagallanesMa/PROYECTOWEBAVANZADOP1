import { Routes } from '@angular/router';
import { CrudPedidosComponent } from './components/crud-pedidos/crud-pedidos.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { CrudProductoComponent } from './components/crud-producto/crud-producto.component';
import { CrudCategoriaComponent } from './components/crud-categoria/crud-categoria.component';

export const routes: Routes = [

    {path:"pedidos", component: CrudPedidosComponent},
    {path:"usuario", component: CrudUsuarioComponent},
    {path:"producto", component: CrudProductoComponent},
    {path: "crud-categoria",component:CrudCategoriaComponent},

    //rutas por defecto
    {path: " ", redirectTo:"pedidos", pathMatch: 'full'},
    {path:"**", redirectTo:"pedidos"}, 

    {path: " ", redirectTo:"usuario", pathMatch: 'full'},
    {path:"**", redirectTo:"usuario"}, 

    {path: " ", redirectTo:"prodcutos", pathMatch: 'full'},
    {path:"**", redirectTo:"prodcutos"}, 

    {path: " ", redirectTo:"prodcuto", pathMatch: 'full'},
    {path:"**", redirectTo:"prodcuto"}, 
];
