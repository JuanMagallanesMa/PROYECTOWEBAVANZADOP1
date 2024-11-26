import { Producto } from "./Producto";

export interface HeaderPedido{
    idHeaderPedido ?: number;
    //idUsuario: number;
    nombresCompletos:string;
    cedula: string;
    telefono: string;
    provincia: string;
    direccion:string;
    productos: Producto[];
    Total: number; 
}