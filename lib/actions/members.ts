"use server";

import { createClient } from "@/lib/supabase/server";
import { Membro } from "../types";

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

export async function getMembros(): Promise<Membro[]> {
  const supabase = await createClient();

  // Fetch members from the "members" table
  /*   const { data, error } = await supabase
    .from("membros")
    .select("id, nome, foto, telefone") // Select only necessary fields
    .order("nome", { ascending: true })
    .limit(20); // Limit to 100 members for performance */

  // Full Text search for members based on the search query using unaccent and to_tsvector
  const search_query = ""; // Replace with the actual search query
  const { data, error } = await supabase
    .from("membros")
    .select("id, nome, foto, telefone")
    .ilike("nome", `%${search_query}%`) // Replace "search_query" with the actual search query
    .order("nome", { ascending: true })
    .limit(16);

  console.log("Data fetched from Supabase:", data);

  if (error) {
    console.error("Erro fetching membros:", error);
    throw new Error("Erro fetching membros");
  }

  return data as Membro[];
}
