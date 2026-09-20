import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Prijava i registracija | BiblioTeka" },
      {
        name: "description",
        content: "Registrujte se ili se prijavite da evidentirate pozajmljene knjige u BiblioTeci.",
      },
      { property: "og:title", content: "Prijava i registracija | BiblioTeka" },
      {
        property: "og:description",
        content: "Registrujte se ili se prijavite da evidentirate pozajmljene knjige u BiblioTeci.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) void navigate({ to: "/clanovi" });
  }, [user, navigate]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail.trim(),
      password: loginPassword,
    });
    setBusy(false);
    if (error) {
      toast.error("Prijava nije uspela: " + error.message);
      return;
    }
    toast.success("Dobro došli natrag!");
    void navigate({ to: "/clanovi" });
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) {
      setBusy(false);
      toast.error("Registracija nije uspela: " + error.message);
      return;
    }

    const newUser = data.user;
    if (newUser && data.session) {
      const { error: profileError } = await supabase.from("clanovi").insert({
        id: newUser.id,
        ime_i_prezime: name.trim(),
        email: email.trim(),
        telefon: phone.trim() || null,
      });
      if (profileError) {
        setBusy(false);
        toast.error("Profil člana nije sačuvan: " + profileError.message);
        return;
      }
    }

    setBusy(false);
    toast.success("Registracija je uspešna!");
    void navigate({ to: "/clanovi" });
  };

  return (
    <div className="mx-auto max-w-md px-5 py-14">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="font-display text-2xl">Pristup biblioteci</CardTitle>
          <CardDescription>Prijavite se ili otvorite novu člansku karticu.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="login">Prijava</TabsTrigger>
              <TabsTrigger value="register">Registracija</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form className="space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="pera@primer.rs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Lozinka</Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Prijava u toku..." : "Prijavi se"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form className="space-y-4" onSubmit={handleRegister}>
                <div className="space-y-2">
                  <Label htmlFor="name">Ime i prezime</Label>
                  <Input
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Petar Petrović"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pera@primer.rs"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon (opciono)</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="060 123 4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Lozinka</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Kreiranje računa..." : "Registruj se"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
