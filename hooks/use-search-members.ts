"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchMembros } from "@/lib/actions/members";

export function useSearchMembers(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  return useQuery({
    queryKey: ["members", "search", debouncedQuery],
    queryFn: () => searchMembros(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0, // Only search when there's a query
    placeholderData: (prev) => prev,
  });
}
