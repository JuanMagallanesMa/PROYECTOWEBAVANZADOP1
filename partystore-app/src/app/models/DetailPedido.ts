import { HeaderPedido } from "./HeaderPedido";
import { Producto } from "./Producto";

export interface DetailPedido{
    id?:number;
    orderId: number;
    order?: HeaderPedido;
    productId: number;
    product?: Producto;
    cantidad: number;
    subtotal: number;
    isActive: boolean;
    
}