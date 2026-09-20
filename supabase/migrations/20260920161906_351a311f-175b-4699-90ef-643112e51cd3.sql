CREATE TABLE public.clanovi (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  ime_i_prezime TEXT NOT NULL,
  email TEXT NOT NULL,
  telefon TEXT,
  clan_od DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.clanovi TO authenticated;
GRANT ALL ON public.clanovi TO service_role;
ALTER TABLE public.clanovi ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Prijavljeni vide sve clanove" ON public.clanovi FOR SELECT TO authenticated USING (true);
CREATE POLICY "Korisnik kreira svoj profil" ON public.clanovi FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Korisnik menja svoj profil" ON public.clanovi FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.knjige (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  naslov TEXT NOT NULL,
  autor TEXT NOT NULL,
  godina INTEGER,
  zanr TEXT,
  broj_primeraka INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.knjige TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.knjige TO authenticated;
GRANT ALL ON public.knjige TO service_role;
ALTER TABLE public.knjige ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Katalog je javan" ON public.knjige FOR SELECT USING (true);
CREATE POLICY "Prijavljeni dodaju knjige" ON public.knjige FOR INSERT TO authenticated WITH CHECK (true);

CREATE TABLE public.pozajmice (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  clan_id UUID NOT NULL REFERENCES public.clanovi(id) ON DELETE CASCADE,
  knjiga_id UUID REFERENCES public.knjige(id) ON DELETE SET NULL,
  naslov TEXT NOT NULL,
  autor TEXT NOT NULL,
  datum_pozajmice DATE NOT NULL DEFAULT CURRENT_DATE,
  rok_vracanja DATE NOT NULL,
  vracena BOOLEAN NOT NULL DEFAULT false,
  napomena TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.pozajmice TO authenticated;
GRANT ALL ON public.pozajmice TO service_role;
ALTER TABLE public.pozajmice ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Prijavljeni vide sve pozajmice" ON public.pozajmice FOR SELECT TO authenticated USING (true);
CREATE POLICY "Korisnik dodaje svoje pozajmice" ON public.pozajmice FOR INSERT TO authenticated WITH CHECK (auth.uid() = clan_id);
CREATE POLICY "Korisnik menja svoje pozajmice" ON public.pozajmice FOR UPDATE TO authenticated USING (auth.uid() = clan_id) WITH CHECK (auth.uid() = clan_id);
CREATE POLICY "Korisnik brise svoje pozajmice" ON public.pozajmice FOR DELETE TO authenticated USING (auth.uid() = clan_id);

INSERT INTO public.knjige (naslov, autor, godina, zanr, broj_primeraka) VALUES
  ('Na Drini ćuprija', 'Ivo Andrić', 1945, 'Roman', 4),
  ('Seobe', 'Miloš Crnjanski', 1929, 'Roman', 3),
  ('Sto godina samoće', 'Gabriel García Márquez', 1967, 'Magijski realizam', 2),
  ('1984', 'George Orwell', 1949, 'Distopija', 5),
  ('Mali princ', 'Antoine de Saint-Exupéry', 1943, 'Dečja književnost', 6),
  ('Zločin i kazna', 'Fjodor Dostojevski', 1866, 'Klasik', 2);