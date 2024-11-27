import { Producto } from "./Producto";

export interface HeaderPedido{
    id:string;
    //id: number;
    nombresCompletos:string;
    cedula: string;
    telefono: string;
    provincia: string;
    direccion:string;
    productos: Producto[];
    Total: number; 
}