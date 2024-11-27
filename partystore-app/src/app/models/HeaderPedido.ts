import { Producto } from "./Producto";

export interface HeaderPedido{
    id:string;
    estado: string;
    nombresCompletos:string;
    cedula: string;
    telefono: string;
    provincia: string;
    direccion:string;
    productos: Producto[];
    Total: number; 
}