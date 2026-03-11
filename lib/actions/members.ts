"use server";

import { createClient } from "@/lib/supabase/server";
import { Membro } from "../types";
import { RolMember } from "@/app/(dashboard)/rol/columns";

export async function searchMembros(query: string): Promise<Membro[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("membros")
    .select("id, nome, foto, telefone")
    .ilike("nome", `%${query}%`) // Search by name using case-insensitive like
    .order("nome", { ascending: true })
    .limit(10); // Limit results for performance

  if (error) {
    console.error("Erro searching membros:", error);
    throw new Error("Erro searching membros");
  }

  return data as Membro[];
}

export async function getMembros(): Promise<RolMember[]> {
  const supabase = await createClient();

  // Fetch members from the "members" table
  const { data, error } = await supabase
    .from("membros")
    .select("id, nome, telefone, foto, situacao") // Select only necessary fields
    .order("nome", { ascending: true });
  // .limit(20); // Limit to 100 members for performance

  if (error) {
    console.error("Erro fetching membros:", error);
    throw new Error("Erro fetching membros");
  }

  return data as RolMember[];
}
