export interface DetailPedido{
    idDetailPedido ?: number;
    idUsuario: number;
    date: Date;
    SubTotal: number;
    IVA: 0.15;
    totalDue: number;
}