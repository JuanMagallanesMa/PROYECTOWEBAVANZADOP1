export interface Usuario {

    id: number;
    nombreCompleto: string;
    correo: string;
    contrasena: any;
    telefono: string;
    rol: 'cliente' | 'administrador' | 'vendedor';
    estado: boolean;
  }
  