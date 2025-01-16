export interface Producto {
  id: number;
  nombre: string;
  categoria: Category;
  categoryId: number;
  precio: number;
  descripcion: string;
  imagen: string;
  stock: number;
  isActive: boolean;
}
