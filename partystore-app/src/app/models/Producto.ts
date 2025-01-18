import { Categoria } from "./Categoria";
export interface Producto {
  id: number;
  nombre: string;
  categoria: Categoria;
  categoryId: number;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  isActive: boolean;
}
