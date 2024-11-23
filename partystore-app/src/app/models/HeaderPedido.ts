export interface HeaderPedido{
    idHeaderPedido ?: number;
    idUsuario: number;
    nombresCompletos:string;
    cedula: string;
    telefono: string;
    email: string;
    provincia: string;
    ciudad:string;
    zip:string;
    direccion:string;
    date: Date;
    SubTotal: number;
    IVA: 0.15;
    totalDue: number;
}