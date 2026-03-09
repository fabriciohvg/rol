"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSearchMembers } from "@/hooks/use-search-members";
import { Membro } from "@/lib/types";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface MemberSearchComboboxProps {
  onSelect: (member: Membro) => void;
}

export function MemberSearch({ onSelect }: MemberSearchComboboxProps) {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState<Membro | null>(null);

  const {
    data: membros = [],
    isFetching,
    isError,
  } = useSearchMembers(inputValue);

  function handleValueChange(member: Membro | null) {
    setSelected(member);
    if (member) {
      onSelect?.(member);
    }
  }

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <Combobox
      // --- Data ---
      items={membros}
      value={selected}
      onValueChange={handleValueChange}
      // --- Async Filtering ---
      filter={null}
      inputValue={inputValue}
      onInputValueChange={(val) => setInputValue(val)}
      // --- Render ---
      itemToStringValue={(member: Membro) => member.nome}
    >
      <div className="relative w-72">
        <ComboboxInput placeholder="Procurar..." showClear />
        {isFetching && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        )}
      </div>
      <ComboboxContent>
        {isError && (
          <p className="py-6 text-center text-sm text-destructive">
            Erro ao carregar membros. Tente novamente.
          </p>
        )}
        <ComboboxEmpty>
          {inputValue.trim()
            ? "Nenhum membro encontrado"
            : "Comece a digitar para procurar membros."}
        </ComboboxEmpty>
        <ComboboxList>
          {(membro: Membro) => (
            <ComboboxItem
              key={membro.id}
              value={membro.nome}
              className="flex items-center gap-2"
            >
              <Avatar className="size-6">
                <AvatarImage src={membro.foto || undefined} alt={membro.nome} />
                <AvatarFallback className="text-sm">
                  {getInitials(membro.nome)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">{membro.nome}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
