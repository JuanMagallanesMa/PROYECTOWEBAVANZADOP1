export interface Producto {
  id: number;
  nombre: string;
  categoria: category;
  categoryId: number;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  isActive: boolean;
}
