import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/clanovi/$clanId")({
  head: () => ({
    meta: [
      { title: "Detalji člana | BiblioTeka" },
      { name: "description", content: "Spisak knjiga koje je izabrani član biblioteke pozajmio." },
      { property: "og:title", content: "Detalji člana | BiblioTeka" },
      {
        property: "og:description",
        content: "Spisak knjiga koje je izabrani član biblioteke pozajmio.",
      },
    ],
  }),
  component: ClanDetalji,
});

function ClanDetalji() {
  const { clanId } = Route.useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["clan", clanId],
    queryFn: async () => {
      const [clan, pozajmice] = await Promise.all([
        supabase.from("clanovi").select("*").eq("id", clanId).maybeSingle(),
        supabase
          .from("pozajmice")
          .select("*")
          .eq("clan_id", clanId)
          .order("datum_pozajmice", { ascending: false }),
      ]);
      if (clan.error) throw clan.error;
      if (pozajmice.error) throw pozajmice.error;
      return { clan: clan.data, pozajmice: pozajmice.data ?? [] };
    },
  });

  const vrati = async (id: string) => {
    const { error } = await supabase.from("pozajmice").update({ vracena: true }).eq("id", id);
    if (error) {
      toast.error("Nije uspelo: " + error.message);
      return;
    }
    toast.success("Knjiga je evidentirana kao vraćena.");
    await queryClient.invalidateQueries({ queryKey: ["clan", clanId] });
  };

  if (isLoading) return <p className="mx-auto max-w-3xl px-5 py-14 text-muted-foreground">Učitavanje...</p>;
  if (error) return <p className="mx-auto max-w-3xl px-5 py-14 text-destructive">Greška pri učitavanju.</p>;
  if (!data?.clan)
    return <p className="mx-auto max-w-3xl px-5 py-14 text-muted-foreground">Član nije nađen.</p>;

  const clan = data.clan;

  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
        <Link to="/clanovi">
          <ArrowLeft className="mr-1 h-4 w-4" /> Svi članovi
        </Link>
      </Button>

      <h1 className="font-display text-3xl font-semibold">{clan.ime_i_prezime}</h1>
      <p className="mt-2 text-muted-foreground">
        {clan.email}
        {clan.telefon ? ` · ${clan.telefon}` : ""} · član od{" "}
        {new Date(clan.clan_od).toLocaleDateString("sr-RS")}
      </p>

      <h2 className="mt-10 font-display text-xl font-semibold">
        Pozajmljene knjige ({data.pozajmice.length})
      </h2>

      <div className="mt-4 space-y-3">
        {data.pozajmice.length === 0 ? (
          <p className="text-muted-foreground">Ovaj član još nije pozajmio ni jednu knjigu.</p>
        ) : null}

        {data.pozajmice.map((p) => (
          <Card key={p.id} className="border-border/70">
            <CardHeader className="pb-2">
              <CardTitle className="font-display text-lg leading-snug">{p.naslov}</CardTitle>
              <p className="text-sm text-muted-foreground">{p.autor}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge variant="outline">
                  Pozajmljeno: {new Date(p.datum_pozajmice).toLocaleDateString("sr-RS")}
                </Badge>
                <Badge variant="outline">
                  Rok: {new Date(p.rok_vracanja).toLocaleDateString("sr-RS")}
                </Badge>
                {p.vracena ? (
                  <Badge variant="secondary">Vraćena</Badge>
                ) : (
                  <Badge>Kod člana</Badge>
                )}
              </div>
              {p.napomena ? <p className="text-sm text-muted-foreground">{p.napomena}</p> : null}
              {!p.vracena && user?.id === clan.id ? (
                <Button size="sm" variant="outline" onClick={() => void vrati(p.id)}>
                  Označi kao vraćeno
                </Button>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
