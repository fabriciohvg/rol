import MemberSearchHandler from "@/components/member-search-handler";

export default function IgrejaPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 tracking-tight">Rol de membros</h1>
      <p className="text-lg">Página do rol de membros</p>

      <div className="max-w-md border rounded-md border-dashed space-y-2 p-2 mt-4">
        <p className="text-sm">Procurar membros por nome:</p>
        <MemberSearchHandler />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-8">
        {membros.map((membro: Membro) => (
          <Item variant="outline" asChild role="listitem" key={membro.id}>
            <Link href="#">
              <ItemMedia variant="image">
                {membro.foto ? (
                  <Image
                    src={getStorageUrl("images", membro.foto, membro.id)}
                    alt={membro.nome}
                    className="aspect-square w-full object-cover"
                    width={150}
                    height={150}
                  />
                ) : (
                  <img
                    src={`https://api.dicebear.com/9.x/lorelei-neutral/svg?seed=${encodeURIComponent(membro.id)}`}
                    alt={membro.nome}
                    className="aspect-square w-full object-cover brightness-50"
                  />
                )}
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">{membro.nome}</ItemTitle>
                <ItemDescription>{membro.telefone}</ItemDescription>
              </ItemContent>
            </Link>
          </Item>
        ))}
      </div> */}
    </div>
  );
}
