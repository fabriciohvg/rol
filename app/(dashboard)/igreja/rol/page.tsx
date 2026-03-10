import { columns } from "@/app/(dashboard)/igreja/rol/columns";
import { DataTableRol } from "@/app/(dashboard)/igreja/rol/data-table";
import { getMembros } from "@/lib/actions/members";

export default async function RolPage() {
  const data = await getMembros();

  return (
    <div className="container p-2 mx-auto">
      <h1 className="text-2xl font-semibold tracking-tight mb-2">
        Rol de membros
      </h1>
      <p className="font-semibold tracking-tight text-sm text-muted-foreground mb-4">
        Gerencie os membros, suas informações de contato e status de
        participação
      </p>
      <div className="w-full">
        <DataTableRol columns={columns} data={data} />
      </div>
    </div>
  );
}
