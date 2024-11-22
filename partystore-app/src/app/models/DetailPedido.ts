export interface DetailPedido{
    idDetailPedido ?: number;
    idHeaderPedido: number;
    idProduct: number;
    unitPrice: number;
    idDiscount: number;
    lineTotal: number;
}