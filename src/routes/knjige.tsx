import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/knjige")({
  head: () => ({
    meta: [
      { title: "Katalog knjiga | BiblioTeka" },
      {
        name: "description",
        content: "Pregledajte katalog knjiga dostupnih za pozajmicu u biblioteci BiblioTeka.",
      },
      { property: "og:title", content: "Katalog knjiga | BiblioTeka" },
      {
        property: "og:description",
        content: "Pregledajte katalog knjiga dostupnih za pozajmicu u biblioteci BiblioTeka.",
      },
    ],
  }),
  component: KnjigePage,
});

function KnjigePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["knjige"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("knjige")
        .select("*")
        .order("naslov", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="font-display text-3xl font-semibold">Katalog knjiga</h1>
      <p className="mt-2 text-muted-foreground">
        Sve knjige koje se trenutno vode u fondu biblioteke.
      </p>

      {isLoading ? <p className="mt-8 text-muted-foreground">Učitavanje...</p> : null}
      {error ? <p className="mt-8 text-destructive">Greška pri učitavanju kataloga.</p> : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((knjiga) => (
          <Card key={knjiga.id} className="border-border/70">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg leading-snug">{knjiga.naslov}</CardTitle>
              <p className="text-sm text-muted-foreground">{knjiga.autor}</p>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-2 text-xs">
              {knjiga.zanr ? <Badge variant="secondary">{knjiga.zanr}</Badge> : null}
              {knjiga.godina ? <Badge variant="outline">{knjiga.godina}</Badge> : null}
              <Badge variant="outline">{knjiga.broj_primeraka} primeraka</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
