export interface Membro {
  id: string;
  numero_ordem: string | null;
  nome: string;
  foto: string | null;
  endereco: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  cep: string | null;
  telefone: string | null;
  email: string | null;
  data_nascimento: string | null; // ISO date string (YYYY-MM-DD)
  naturalidade: string | null;
  sexo: string | null;
  estado_civil: string | null;
  conjuge: string | null;
  data_casamento: string | null;
  escolaridade: string | null;
  profissao: string | null;
  nome_pai: string | null;
  nome_mae: string | null;
  id_igreja: string | null;
  membro: string | null;
  oficial: string | null;
  data_batismo: string | null;
  pastor_batismo: string | null;
  igreja_batismo: string | null;
  data_profissao_fe: string | null;
  pastor_profissao_fe: string | null;
  igreja_profissao_fe: string | null;
  data_admissao: string | null;
  meio_admissao: string | null;
  data_demissao: string | null;
  meio_demissao: string | null;
  situacao: string;
  created_at: string | null; // ISO timestamp string
  updated_at: string | null;
}

// Para inserção (id, created_at e updated_at têm defaults)
export type MembroInsert = Omit<Membro, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string | null;
  updated_at?: string | null;
};

// Para atualização (todos os campos são opcionais)
export type MembroUpdate = Partial<MembroInsert>;

export interface NovoMembro {
  id: string;
  nome: string;
  telefone: string | null;
  sexo: string | null;
  data_nascimento: string | null;
  email: string | null;
  endereco: string | null;
  cep: string | null;
  estado_civil: string | null;
  conjuge: string | null;
  filhos: string | null;
  filhos_nome: string | null;
  profissao: string | null;
  igreja_origem: string | null;
  batizado: string | null;
  nome_mae: string | null;
  nome_pai: string | null;
  naturalidade: string | null;
  foto: string | null;
  created_at: string | null;
  updated_at: string | null;
  ata: string | null;
}
