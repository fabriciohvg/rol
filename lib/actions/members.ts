"use server";

import { createClient } from "@/lib/supabase/server";
import { Membro } from "../types";

export async function getMembros(): Promise<Membro[]> {
  const supabase = await createClient();

  // Fetch members from the "members" table
  const { data, error } = await supabase
    .from("membros")
    .select("id, nome, foto, telefone") // Select only necessary fields
    .order("nome", { ascending: true })
    .limit(20); // Limit to 100 members for performance

  if (error) {
    console.error("Erro fetching membros:", error);
    throw new Error("Erro fetching membros");
  }

  return data as Membro[];
}
