// resources/js/types.ts

export interface PageProps {
    auth?: {
      user: {
        id: number;
        name: string;
        email: string;
      };
    };
    [key: string]: any; // <- esta línea es clave para evitar el error
  }
  