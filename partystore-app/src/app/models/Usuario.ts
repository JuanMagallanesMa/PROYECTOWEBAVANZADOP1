export interface Usuario {
    id: number;
    nombreCompleto: string;
    correo: string;
    telefono: string;
    rol: 'cliente' | 'administrador' | 'vendedor';
    estado: boolean;
  }
  