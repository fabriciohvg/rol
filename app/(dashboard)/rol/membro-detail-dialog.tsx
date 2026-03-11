"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getMembroById } from "@/lib/actions/members";
import { Membro } from "@/lib/types";

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date + "T00:00:00").toLocaleDateString("pt-BR");
}

function buildAddress(membro: Membro) {
  return [
    membro.endereco,
    membro.complemento,
    membro.bairro,
    membro.cidade,
    membro.cep,
  ]
    .filter(Boolean)
    .join(", ");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm">{value || "—"}</span>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-5 w-48" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-56" />
        </div>
      ))}
    </div>
  );
}

interface MembroDetailDialogProps {
  membroId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MembroDetailDialog({
  membroId,
  open,
  onOpenChange,
}: MembroDetailDialogProps) {
  const [membro, setMembro] = useState<Membro | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!membroId || !open) return;

    setLoading(true);
    setMembro(null);
    getMembroById(membroId)
      .then(setMembro)
      .finally(() => setLoading(false));
  }, [membroId, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{membro?.nome ?? "Detalhes do membro"}</DialogTitle>
        </DialogHeader>

        {loading ? (
          <LoadingSkeleton />
        ) : membro ? (
          <Tabs defaultValue="pessoais">
            <TabsList className="w-full">
              <TabsTrigger value="pessoais" className="flex-1">
                Dados pessoais
              </TabsTrigger>
              <TabsTrigger value="eclesiasticos" className="flex-1">
                Dados eclesiásticos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pessoais" className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <Avatar size="lg">
                  <AvatarImage
                    src={
                      membro.foto
                        ? `https://bscjzyrtblhpoadluumz.supabase.co/storage/v1/object/public/images/${membro.foto}`
                        : undefined
                    }
                  />
                  <AvatarFallback>
                    {getInitials(membro.nome)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-lg font-medium">{membro.nome}</span>
              </div>
              <Field label="Telefone" value={membro.telefone} />
              <Field label="Endereço" value={buildAddress(membro) || null} />
              <Field
                label="Data de nascimento"
                value={formatDate(membro.data_nascimento)}
              />
              <Field label="Estado civil" value={membro.estado_civil} />
              <Field label="Cônjuge" value={membro.conjuge} />
              <Field label="Profissão" value={membro.profissao} />
            </TabsContent>

            <TabsContent value="eclesiasticos" className="space-y-4 pt-2">
              <Field label="Membro" value={membro.membro} />
              <Field
                label="Data admissão"
                value={formatDate(membro.data_admissao)}
              />
              <Field label="Meio de admissão" value={membro.meio_admissao} />
              <Field
                label="Data demissão"
                value={formatDate(membro.data_demissao)}
              />
              <Field label="Meio demissão" value={membro.meio_demissao} />
              <Field label="Situação" value={membro.situacao} />
            </TabsContent>
          </Tabs>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
