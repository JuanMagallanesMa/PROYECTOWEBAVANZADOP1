export interface DetailPedido{
    idDetailPedido ?: number;
    idHeaderPedido: number;
    idProduct: number;
    cantidad: number;
    lineTotal: number;
}