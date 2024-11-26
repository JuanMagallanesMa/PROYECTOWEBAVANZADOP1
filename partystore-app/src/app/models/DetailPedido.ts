import { HeaderPedido } from "./HeaderPedido";

export interface DetailPedido{
    idDetailPedido ?: number;
    idHeaderPedido: HeaderPedido;
    idProduct: number;
    cantidad: number;
    lineTotal: number;
}