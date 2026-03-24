"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getNovoMembroById,
  uploadNovoMembroFoto,
} from "@/lib/actions/novos-membros";
import { NovoMembro } from "@/lib/types";
import { Camera, Loader2 } from "lucide-react";

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date + "T00:00:00").toLocaleDateString("pt-BR");
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
      <Skeleton className="aspect-square w-32 rounded-md" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-56" />
        </div>
      ))}
    </div>
  );
}

interface NovoMembroDetailDialogProps {
  membroId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NovoMembroDetailDialog({
  membroId,
  open,
  onOpenChange,
}: NovoMembroDetailDialogProps) {
  const [membro, setMembro] = useState<NovoMembro | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!membroId || !open) return;

    setLoading(true);
    setMembro(null);
    getNovoMembroById(membroId)
      .then(setMembro)
      .finally(() => setLoading(false));
  }, [membroId, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90dvh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {membro?.nome ?? "Detalhes do novo membro"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <LoadingSkeleton />
        ) : membro ? (
          <Tabs defaultValue="pessoais" className="flex flex-col overflow-hidden">
            <TabsList className="w-full shrink-0">
              <TabsTrigger value="pessoais" className="flex-1">
                Dados pessoais
              </TabsTrigger>
              <TabsTrigger value="eclesiasticos" className="flex-1">
                Dados eclesiásticos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pessoais" className="overflow-y-auto space-y-4 pt-2 pr-1">
              <div className="relative aspect-square w-32 overflow-hidden rounded-md bg-muted shrink-0">
                {membro.foto ? (
                  <img
                    src={`https://bscjzyrtblhpoadluumz.supabase.co/storage/v1/object/public/images/${membro.foto}`}
                    alt={membro.nome}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex h-full w-full flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    {uploading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <>
                        <Camera className="h-6 w-6" />
                        <span className="text-xs">Adicionar foto</span>
                      </>
                    )}
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file || !membro) return;

                    setUploading(true);
                    try {
                      const formData = new FormData();
                      formData.append("file", file);
                      formData.append("membroId", membro.id);
                      formData.append("membroNome", membro.nome);

                      const filePath = await uploadNovoMembroFoto(formData);
                      setMembro({ ...membro, foto: filePath });
                    } catch (error) {
                      console.error("Erro uploading foto:", error);
                    } finally {
                      setUploading(false);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
              <Field label="Telefone" value={membro.telefone} />
              <Field label="Email" value={membro.email} />
              <Field label="Endereço" value={membro.endereco} />
              <Field label="CEP" value={membro.cep} />
              <Field
                label="Data de nascimento"
                value={formatDate(membro.data_nascimento)}
              />
              <Field label="Sexo" value={membro.sexo} />
              <Field label="Estado civil" value={membro.estado_civil} />
              <Field label="Cônjuge" value={membro.conjuge} />
              <Field label="Filhos" value={membro.filhos} />
              <Field label="Nome dos filhos" value={membro.filhos_nome} />
              <Field label="Profissão" value={membro.profissao} />
              <Field label="Naturalidade" value={membro.naturalidade} />
              <Field label="Nome do pai" value={membro.nome_pai} />
              <Field label="Nome da mãe" value={membro.nome_mae} />
            </TabsContent>

            <TabsContent value="eclesiasticos" className="overflow-y-auto space-y-4 pt-2 pr-1">
              <Field label="Igreja de origem" value={membro.igreja_origem} />
              <Field label="Batizado" value={membro.batizado} />
              <Field label="Ata" value={membro.ata} />
            </TabsContent>
          </Tabs>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
