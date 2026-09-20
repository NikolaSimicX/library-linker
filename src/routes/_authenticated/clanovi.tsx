import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/clanovi")({
  head: () => ({
    meta: [
      { title: "Članovi biblioteke | BiblioTeka" },
      {
        name: "description",
        content: "Spisak članova biblioteke i broj knjiga koje je svaki član pozajmio.",
      },
      { property: "og:title", content: "Članovi biblioteke | BiblioTeka" },
      {
        property: "og:description",
        content: "Spisak članova biblioteke i broj knjiga koje je svaki član pozajmio.",
      },
    ],
  }),
  component: ClanoviPage,
});

function ClanoviPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["clanovi-sa-pozajmicama"],
    queryFn: async () => {
      const [clanovi, pozajmice] = await Promise.all([
        supabase.from("clanovi").select("*").order("ime_i_prezime"),
        supabase.from("pozajmice").select("clan_id, vracena"),
      ]);
      if (clanovi.error) throw clanovi.error;
      if (pozajmice.error) throw pozajmice.error;

      return (clanovi.data ?? []).map((clan) => {
        const zaClana = (pozajmice.data ?? []).filter((p) => p.clan_id === clan.id);
        return {
          ...clan,
          ukupno: zaClana.length,
          aktivne: zaClana.filter((p) => !p.vracena).length,
        };
      });
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <h1 className="font-display text-3xl font-semibold">Članovi</h1>
      <p className="mt-2 text-muted-foreground">
        Kliknite na ime člana da vidite spisak knjiga koje je pozajmio.
      </p>

      {isLoading ? <p className="mt-8 text-muted-foreground">Učitavanje...</p> : null}
      {error ? <p className="mt-8 text-destructive">Greška pri učitavanju članova.</p> : null}

      <div className="mt-8 space-y-3">
        {data?.length === 0 ? (
          <p className="text-muted-foreground">Još nema registrovanih članova.</p>
        ) : null}

        {data?.map((clan) => (
          <Link key={clan.id} to="/clanovi/$clanId" params={{ clanId: clan.id }} className="block">
            <Card className="border-border/70 transition-colors hover:border-primary/60 hover:bg-accent/40">
              <CardContent className="flex items-center gap-4 py-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 font-display text-base font-semibold text-primary">
                  {clan.ime_i_prezime.slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{clan.ime_i_prezime}</p>
                  <p className="truncate text-sm text-muted-foreground">{clan.email}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <Badge variant="secondary">{clan.ukupno} pozajmica</Badge>
                  {clan.aktivne > 0 ? <Badge>{clan.aktivne} kod člana</Badge> : null}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
