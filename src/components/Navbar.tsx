import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const linkClass =
  "text-sm font-medium text-foreground/70 transition-colors hover:text-primary data-[status=active]:text-primary";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    await navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
          <BookOpen className="h-5 w-5" />
          BiblioTeka
        </Link>

        <div className="hidden items-center gap-5 sm:flex">
          <Link to="/" className={linkClass}>
            Početna
          </Link>
          <Link to="/knjige" className={linkClass}>
            Katalog
          </Link>
          {mounted && user ? (
            <>
              <Link to="/pozajmice" className={linkClass}>
                Nova pozajmica
              </Link>
              <Link to="/clanovi" className={linkClass}>
                Članovi
              </Link>
            </>
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-3">
          {!mounted ? null : user ? (
            <>
              <span className="hidden text-xs text-muted-foreground md:inline">{user.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-1 h-4 w-4" /> Odjava
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link to="/auth">Prijava / Registracija</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
