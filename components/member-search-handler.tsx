"use client";

import { MemberSearch } from "@/components/member-search";

export default function MemberSearchHandler() {
  return (
    <MemberSearch
      onSelect={(member) =>
        console.log("Selected member:", member.id, member.nome)
      }
    />
  );
}
