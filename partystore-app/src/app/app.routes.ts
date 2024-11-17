import { Routes } from '@angular/router';
import { UsuariosComponent } from './components/crud-usuarios/crud-usuarios.component';

export const routes: Routes = [
    {path: "crud-usuario",component:UsuariosComponent},


    {path:"**", redirectTo:"crud-usuario" },


];
