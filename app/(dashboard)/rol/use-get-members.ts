"use client";

import { useQuery } from "@tanstack/react-query";
import { getMembros } from "@/lib/actions/members";

export function useGetMembers() {
  return useQuery({
    queryKey: ["get-members"],
    queryFn: getMembros,
  });
}
