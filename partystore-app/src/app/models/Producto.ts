import { Categoria } from "./Categoria";
export interface Producto {
  toLowerCase(): unknown;
  id: number;
  nombre: string;
  category?: Categoria;
  categoryId: number;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  isActive: boolean;
}
