"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { PhoneCallIcon } from "lucide-react";

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
    header: "Membro",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col max-w-lg">
          <div className="">{row.getValue("nome")}</div>
          <div className="flex items-center gap-2 text-sm tracking-tight tabular-nums">
            <PhoneCallIcon size="12" />
            {row.getValue("telefone")}
          </div>
        </div>
      );
    },
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
