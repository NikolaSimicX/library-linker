import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/pozajmice")({
  head: () => ({
    meta: [
      { title: "Nova pozajmica | BiblioTeka" },
      {
        name: "description",
        content: "Unesite novu pozajmicu knjige: naslov, autor, datum pozajmice i rok vraćanja.",
      },
      { property: "og:title", content: "Nova pozajmica | BiblioTeka" },
      {
        property: "og:description",
        content: "Unesite novu pozajmicu knjige: naslov, autor, datum pozajmice i rok vraćanja.",
      },
    ],
  }),
  component: NovaPozajmica;
});

function danas() {
  return new Date().toISOString().slice(0, 10);
}

function zaDana(dana: number) {
  const d = new Date();
  d.setDate(d.getDate() + dana);
  return d.toISOString().slice(0, 10);
}

function NovaPozajmica() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  const [knjigaId, setKnjigaId] = useState<string>("");
  const [naslov, setNaslov] = useState("");
  const [autor, setAutor] = useState("");
  const [datum, setDatum] = useState(danas());
  const [rok, setRok] = useState(zaDana(21));
  const [napomena, setNapomena] = useState("");

  const { data: knjige } = useQuery({
    queryKey: ["knjige"],
    queryFn: async () => {
      const { data, error } = await supabase.from("knjige").select("*").order("naslov");
      if (error) throw error;
      return data;
    },
  });

  const izaberiKnjigu = (id: string) => {
    setKnjigaId(id);
    const knjiga = knjige?.find((k) => k.id === id);
    if (knjiga) {
      setNaslov(knjiga.naslov);
      setAutor(knjiga.autor);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    setBusy(true);

    const { data: profil } = await supabase
      .from("clanovi")
      .select("id")
      .eq("id", user.id)
      .maybeSingle();

    if (!profil) {
      const { error: profileError } = await supabase.from("clanovi").insert({
        id: user.id,
        ime_i_prezime: user.email?.split("@")[0] ?? "Član",
        email: user.email ?? "",
      });
      if (profileError) {
        setBusy(false);
        toast.error("Profil člana nije kreiran: " + profileError.message);
        return;
      }
    }

    const { error } = await supabase.from("pozajmice").insert({
      clan_id: user.id,
      knjiga_id: knjigaId || null,
      naslov: naslov.trim(),
      autor: autor.trim(),
      datum_pozajmice: datum,
      rok_vracanja: rok,
      napomena: napomena.trim() || null,
    });

    setBusy(false);
    if (error) {
      toast.error("Pozajmica nije sačuvana: " + error.message);
      return;
    }

    toast.success("Pozajmica je sačuvana.");
    await queryClient.invalidateQueries();
    void navigate({ to: "/clanovi/$clanId", params: { clanId: user.id } });
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Nova pozajmica</CardTitle>
          <CardDescription>
            Izaberite knjigu iz kataloga ili upišite naslov ručno, pa sačuvajte pozajmicu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Knjiga iz kataloga</Label>
              <Select value={knjigaId} onValueChange={izaberiKnjigu}>
                <SelectTrigger>
                  <SelectValue placeholder="Izaberite knjigu (opciono)" />
                </SelectTrigger>
                <SelectContent>
                  {knjige?.map((k) => (
                    <SelectItem key={k.id} value={k.id}>
                      {k.naslov} — {k.autor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="naslov">Naslov *</Label>
                <Input
                  id="naslov"
                  required
                  value={naslov}
                  onChange={(e) => setNaslov(e.target.value)}
                  placeholder="Na Drini ćuprija"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="autor">Autor *</Label>
                <Input
                  id="autor"
                  required
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  placeholder="Ivo Andrić"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="datum">Datum pozajmice *</Label>
                <Input
                  id="datum"
                  type="date"
                  required
                  value={datum}
                  onChange={(e) => setDatum(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rok">Rok vraćanja *</Label>
                <Input
                  id="rok"
                  type="date"
                  required
                  value={rok}
                  onChange={(e) => setRok(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="napomena">Napomena</Label>
              <Textarea
                id="napomena"
                value={napomena}
                onChange={(e) => setNapomena(e.target.value)}
                placeholder="Npr. knjiga je u mekom izdanju, blago pohabana."
              />
            </div>

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Čuvanje..." : "Sačuvaj pozajmicu"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
