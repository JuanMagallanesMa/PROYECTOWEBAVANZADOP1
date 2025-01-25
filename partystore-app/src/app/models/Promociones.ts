// models/Promociones.ts
export interface Promocion {
    id: number;
    nombre: string;
    descripcion: string;
    id_categoria?: string;
    id_producto?: number;
    descuentoPorcentaje: number;
    fechaFin: Date;
    isActive: boolean;
}