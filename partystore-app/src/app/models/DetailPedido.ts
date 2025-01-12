import { HeaderPedido } from "./HeaderPedido";
import { Producto } from "./Producto";

export interface DetailPedido{
    id:number;
    idHeader: number;
    HeaderPedido: HeaderPedido;
    idProducto: number;
    Producto: Producto;
    cantidad: number;
    subtotal: number;
    estado: string;
    
}