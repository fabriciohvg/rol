"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { PhoneCallIcon } from "lucide-react";
import { NovoMembroRow } from "@/lib/actions/novos-membros";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export const columns: ColumnDef<NovoMembroRow>[] = [
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
    cell: ({ row, table }) => {
      const meta = table.options.meta as {
        onClickNome?: (id: string) => void;
      };
      return (
        <div className="flex flex-col max-w-lg">
          <button
            className="text-left hover:underline cursor-pointer"
            onClick={() => meta?.onClickNome?.(row.original.id)}
          >
            {row.getValue("nome")}
          </button>
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
];
