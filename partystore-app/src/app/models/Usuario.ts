export interface Usuario {
    idUsuario: number;
    nombreCompleto: string;
    correo: string;
    telefono: string;
    rol: 'cliente' | 'administrador' | 'vendedor';
    estado: boolean;
  }
  