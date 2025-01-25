export interface Categoria {
  id: number;
  nombre: string; // Este debe ser string
  descripcion: string; // Este debe ser string
  estado: 'activo' | 'inactivo'; // Esto no tiene toLowerCase
  edadesAplicables: string[]; // Esto es un arreglo de strings
  tiposEvento: string[]; // Esto es un arreglo de strings
}
