"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

export type RolMember = {
  id: string;
  nome: string;
  telefone: string | null;
  foto: string | null;
  situacao: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const columns: ColumnDef<RolMember>[] = [
  {
    accessorKey: "foto",
    header: "",
    cell: ({ row }) => {
      return (
        <Avatar size="lg">
          <AvatarImage
            src={
              row.getValue("foto")
                ? `https://bscjzyrtblhpoadluumz.supabase.co/storage/v1/object/public/images/${row.getValue("foto")}`
                : undefined
            }
          />
          <AvatarFallback>{getInitials(row.getValue("nome"))}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },
  {
    accessorKey: "situacao",
    header: "Situação",
  },
];
