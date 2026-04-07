import { columns } from "@/app/(dashboard)/novos-membros/columns";
import { DataTableNovosMembros } from "@/app/(dashboard)/novos-membros/data-table";
import { getNovosMembros } from "@/lib/actions/novos-membros";

export default async function NovosMembrosPage() {
  const data = await getNovosMembros();

  return (
    <div className="container p-2 mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Novos membros
      </h1>
      <p className="font-semibold tracking-tight text-sm text-muted-foreground mb-4">
        Gerencie os novos membros e suas informações
      </p>
      <p className="font-semibold mb-2">
        Novos membros registrados na recepção dia{" "}
        <span className="font-bold tabular-nums bg-amber-300">21/03/2026</span>
      </p>
      <div className="w-full">
        <DataTableNovosMembros columns={columns} data={data} />
      </div>
    </div>
  );
}
