export interface Categoria {
  id: number; // Identificador único de la categoría
  nombre: string; // Nombre de la categoría
  descripcion: string; // Descripción de la categoría
  urlImagen: string; // URL de la imagen representativa de la categoría
  estado: 'activo' | 'inactivo'; // Estado de la categoría (activa o inactiva)
  edadesAplicables: string[]; // Rango de edades para los productos de esta categoría
  tiposEvento: string[]; // Tipos de eventos asociados (ej., cumpleaños, bautizos, etc.)
}
