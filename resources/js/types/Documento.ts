// En src/types/index.ts o el archivo donde definas los tipos

export type Documento = {
  id: number;
  tipo: string;
  tipo_legible: string;
  archivo: string;
  estado: string;
  created_at: string;
  user_id: number; // 👤 Para identificar al dueño del documento
  formulario_medico_id: number | null; // 🩺 Si pertenece a un formulario
};


export type PageProps<T> = {
    props: T;
    errors?: Record<string, string>;
};
