# Library Linker

BiblioTeka je MVP web aplikacija za evidenciju pozajmljenih knjiga u biblioteci — zamena za papirne sveske.

Ko koristi: posetilac (vidi katalog knjiga) i prijavljeni član (unosi pozajmice, označava knjige kao vraćene).
Šta radi: registracija i prijava (email + lozinka), forma za unos pozajmice, spisak članova sa brojem pozajmica, i stranica detalja člana sa knjigama koje je pozajmio.
Podaci: tri povezane tabele u bazi — članovi, knjige i pozajmice, sa pravilima pristupa (katalog javan, ostalo samo za prijavljene).
Dizajn: topla bibliotečka paleta (tamnozelena i krem), serifni naslovi, pregledne kartice.
Testirano: registracija, prijava/odjava, unos pozajmice i prikaz podataka — sve provereno u pregledaču bez grešaka.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f4f6ac8c-c71a-56a7-aad8-e5e280953d87).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
