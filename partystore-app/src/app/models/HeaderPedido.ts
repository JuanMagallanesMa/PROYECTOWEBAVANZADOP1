import { Producto } from "./Producto";
import { Usuario } from "./Usuario";

export interface HeaderPedido{
    id:number;
    //idUser: number;
    //user: Usuario;
    name:string;
    cedula: string;
    telefono: string;
    address:string;
    provincia: string;
    
    total: number; 
    estado: true;
}