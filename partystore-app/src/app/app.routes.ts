import { Routes } from '@angular/router';
import { CrudPedidosComponent } from './components/crud-pedidos/crud-pedidos.component';
import { CrudUsuarioComponent } from './components/crud-usuario/crud-usuario.component';
import { CrudProductoComponent } from './components/crud-producto/crud-producto.component';
import { CrudCategoriaComponent } from './components/crud-categoria/crud-categoria.component';
import { ListaProductoComponent } from './components/lista-producto/lista-producto.component';

export const routes: Routes = [

    {path:"pedidos", component: CrudPedidosComponent},
    {path:"usuario", component: CrudUsuarioComponent},
    {path:"producto", component: CrudProductoComponent},
    {path: "categoria",component:CrudCategoriaComponent},
    {path: "marketplace", component:ListaProductoComponent},

    //rutas por defecto
    {path: " ", redirectTo:"pedidos", pathMatch: 'full'},
    {path:"**", redirectTo:"pedidos"}, 

     
];
