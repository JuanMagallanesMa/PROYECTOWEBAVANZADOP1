import { Categoria } from "./Categoria";

// models/Promociones.ts
export interface Promociones {
    id: number;
    nombre: string;
    descripcion: string;
    id_categoria?: string;
    categoria: Categoria;
    descuentoPorcentaje: number;
    fechaFin: Date;
    isActive: boolean;
}