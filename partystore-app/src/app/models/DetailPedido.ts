import { HeaderPedido } from "./HeaderPedido";
import { Producto } from "./Producto";

export interface DetailPedido{
    idDetailPedido ?: number;
    id: HeaderPedido;
    idProduct: Producto;
    cantidad: number;
    lineTotal: number;
}