import { createFileRoute, Link } from "@tanstack/react-router";
import { BookMarked, ClipboardList, Users } from "lucide-react";
import heroImage from "@/assets/biblioteka-hero.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BiblioTeka — evidencija pozajmljenih knjiga" },
      {
        name: "description",
        content:
          "BiblioTeka je jednostavna aplikacija za evidenciju članova biblioteke i knjiga koje su pozajmili.",
      },
      { property: "og:title", content: "BiblioTeka — evidencija pozajmljenih knjiga" },
      {
        property: "og:description",
        content:
          "BiblioTeka je jednostavna aplikacija za evidenciju članova biblioteke i knjiga koje su pozajmili.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: BookMarked,
    title: "Katalog knjiga",
    text: "Fond biblioteke sa autorom, godinom, žanrom i brojem primeraka.",
  },
  {
    icon: ClipboardList,
    title: "Unos pozajmice",
    text: "Forma sa naslovom, autorom, datumom pozajmice i rokom vraćanja.",
  },
  {
    icon: Users,
    title: "Članovi i detalji",
    text: "Spisak članova, a klikom na ime vidite sve knjige koje je član pozajmio.",
  },
];

function Index() {
  const { user } = useAuth();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <img
          src={heroImage}
          alt="Čitaonica biblioteke sa drvenim policama punim knjiga"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-veil" />
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
            Gradska biblioteka · digitalna evidencija
          </p>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-tight text-primary-foreground sm:text-6xl">
            BiblioTeka
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-primary-foreground/85">
            Vodite evidenciju o članovima biblioteke i knjigama koje su pozajmili — bez papira,
            svesaka i izgubljenih rokova.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="cream">
              <Link to={user ? "/pozajmice" : "/auth"}>
                {user ? "Unesi pozajmicu" : "Registracija i prijava"}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outlineCream">
              <Link to="/knjige">Pregledaj katalog</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="font-display text-2xl font-semibold">Šta aplikacija omogućava</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="border-border/70 bg-card">
              <CardHeader className="pb-2">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="font-display text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/50">
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold">Kako se koristi</h2>
          <ol className="mx-auto mt-6 space-y-3 text-left text-sm text-muted-foreground sm:text-base">
            <li>1. Registrujte se — time automatski postajete član biblioteke.</li>
            <li>2. Unesite pozajmicu kroz formu „Nova pozajmica“.</li>
            <li>3. Otvorite stranicu „Članovi“ i kliknite na ime da vidite njegove knjige.</li>
            <li>4. Kada knjigu vratite, označite je kao vraćenu.</li>
          </ol>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        BiblioTeka · MVP projekat izrađen u Lovableu
      </footer>
    </div>
  );
}
