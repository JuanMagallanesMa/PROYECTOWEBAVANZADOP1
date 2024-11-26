import { HeaderPedido } from "./HeaderPedido";
import { Producto } from "./Producto";

export interface DetailPedido{
    idDetailPedido ?: number;
    idHeaderPedido: HeaderPedido;
    idProduct: Producto;
    cantidad: number;
    lineTotal: number;
}