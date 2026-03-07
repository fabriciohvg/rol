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

  // Full Text search for members based on the search query using unaccent and to_tsvector
  /*   const searchQuery = "fabricio"; // Replace with actual search query
  const { data, error } = await supabase.rpc(
    "search_membros_by_name_unaccent",
    { search_term: searchQuery },
  ); */

  console.log("Data fetched from Supabase:", data);

  if (error) {
    console.error("Erro fetching membros:", error);
    throw new Error("Erro fetching membros");
  }

  return data as Membro[];
}
