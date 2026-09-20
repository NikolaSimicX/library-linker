# BiblioTeka — dokumentacija projekta

## Ideja i cilj
BiblioTeka je MVP web aplikacija za evidenciju pozajmljenih knjiga u biblioteci.
Zamenjuje papirne sveske: bibliotekar/član unosi pozajmicu kroz formu, a aplikacija
čuva podatke u bazi i prikazuje spisak članova sa knjigama koje je svaki član pozajmio.

## Tipovi korisnika
- **Posetilac (neprijavljen)** — vidi početnu stranicu i katalog knjiga.
- **Član (prijavljen)** — unosi pozajmice, vidi sve članove i detalje, označava knjigu kao vraćenu.

## Stranice i navigacija
| Stranica | Putanja | Opis |
|---|---|---|
| Početna | `/` | Predstavljanje aplikacije i uputstvo za korišćenje |
| Katalog knjiga | `/knjige` | Prikaz svih knjiga iz baze (javno) |
| Prijava / Registracija | `/auth` | Registracija, logovanje |
| Nova pozajmica | `/pozajmice` | Forma za unos pozajmice (samo prijavljeni) |
| Članovi | `/clanovi` | Spisak članova sa brojem pozajmica |
| Detalji člana | `/clanovi/:id` | Spisak knjiga koje je izabrani član pozajmio |

Navigacija je u gornjoj traci, sa dugmetom za odjavu kada je korisnik prijavljen.

## Baza podataka (Lovable Cloud / Postgres)
- **clanovi** — `id` (isti kao korisnički račun), `ime_i_prezime`, `email`, `telefon`, `clan_od`
- **knjige** — `naslov`, `autor`, `godina`, `zanr`, `broj_primeraka`
- **pozajmice** — `clan_id`, `knjiga_id`, `naslov`, `autor`, `datum_pozajmice`, `rok_vracanja`, `vracena`, `napomena`

Pravila pristupa (RLS): katalog je javan; prijavljeni korisnici vide članove i pozajmice;
svako može da menja samo svoj profil i svoje pozajmice.

## Autentikacija
Email + lozinka. Registracija istovremeno kreira i profil člana u tabeli `clanovi`.
Podržani su registracija, prijava i odjava.

## Dizajn
Topla „bibliotečka“ paleta: tamnozelena i krem, serifni naslovi (Fraunces) i
DM Sans za tekst; kartice i mekani kontrasti. Svi stilovi su definisani kao tokeni dizajn-sistema.

## Testiranje
Testirano automatizovanim scenarijem u pregledaču:
1. Registracija novog korisnika — uspešna, profil člana kreiran.
2. Prijava i odjava — rade ispravno.
3. Unos pozajmice kroz formu — zapis sačuvan u bazi.
4. Prikaz podataka — katalog, spisak članova i detalji člana prikazuju podatke iz baze.
5. Konzola pregledača — bez grešaka.

## Početni prompt (skraćeno)
> Napravi React web aplikaciju „BiblioTeka“ za evidenciju pozajmljenih knjiga.
> Korisnici: posetilac i prijavljeni član. Stranice: početna, katalog knjiga,
> prijava/registracija, forma za novu pozajmicu, spisak članova i detalji člana sa
> spiskom njegovih knjiga. Podaci u bazi: članovi (ime, email, telefon, datum upisa),
> knjige (naslov, autor, godina, žanr, broj primeraka) i pozajmice (član, knjiga,
> datum pozajmice, rok vraćanja, vraćena, napomena). Autentikacija email/lozinka sa
> registracijom, prijavom i odjavom. Dizajn: topla bibliotečka paleta, tamnozelena i
> krem, serifni naslovi, kartice, moderno i pregledno.
