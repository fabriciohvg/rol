"use server";

import { createClient } from "@/lib/supabase/server";
import { NovoMembro } from "../types";

export type NovoMembroRow = {
  id: string;
  nome: string;
  telefone: string | null;
  foto: string | null;
};

export async function getNovosMembros(): Promise<NovoMembroRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("novos_membros")
    .select("id, nome, telefone, foto")
    .order("nome", { ascending: true });

  if (error) {
    console.error("Erro fetching novos membros:", error);
    throw new Error("Erro fetching novos membros");
  }

  return data as NovoMembroRow[];
}

export async function getNovoMembroById(id: string): Promise<NovoMembro> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("novos_membros")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Erro fetching novo membro:", error);
    throw new Error("Erro fetching novo membro");
  }

  return data as NovoMembro;
}

export async function uploadNovoMembroFoto(
  formData: FormData,
): Promise<string> {
  const supabase = await createClient();
  const file = formData.get("file") as File;
  const membroId = formData.get("membroId") as string;
  const membroNome = formData.get("membroNome") as string;

  if (!file || !membroId || !membroNome) {
    throw new Error("Missing required fields: file, membroId, or membroNome");
  }

  const ext = file.name.split(".").pop();
  const filePath = `picture/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    console.error("Supabase upload error:", uploadError);
    throw new Error(`Erro uploading foto: ${uploadError.message}`);
  }

  const { error: updateError } = await supabase
    .from("novos_membros")
    .update({ foto: filePath })
    .eq("id", membroId);

  if (updateError) {
    console.error("Supabase update error:", updateError);
    throw new Error(`Erro updating novo membro foto: ${updateError.message}`);
  }

  return filePath;
}
