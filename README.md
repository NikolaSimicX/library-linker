# Library Linker

adatak

Opis zadatka

Vaš zadatak je da pomoću AI alata Lovable kreirate funkcionalnu React web aplikaciju po sopstvenoj ideji. Aplikacija treba da predstavlja jednostavan, ali funkcionalan MVP (minimum viable product) – prvu radnu verziju proizvoda koja ima jasnu svrhu, osnovne funkcionalnosti, korisnički interfejs i povezanu bazu podataka.

Aplikacija treba da bude povezana sa Supabase backend servisom i bazom podataka i da omogući rad sa korisnicima i podacima kroz forme, prikaz podataka i osnovnu navigaciju.

Aplikacija ne mora biti kompleksna. Fokus zadatka nije na količini funkcionalnosti već na pravilnoj primeni AI alata, povezivanju sa bazom podataka i izradi funkcionalnog MVP-ja.

Predlog teme

Jedan od predloga je aplikacija za pozajmljivanje knjiga u biblioteci.

Takva aplikacija može da sadrži:

registraciju korisnika,

logovanje korisnika,

formu za pozajmljene knjige,

stranicu sa prikazom svih korisnika,

mogućnost da se klikom na ime korisnika prikaže spisak knjiga koje je taj korisnik pozajmio.


Možete izabrati i drugu temu, na primer:

aplikaciju za evidenciju treninga,

aplikaciju za rezervaciju opreme,

aplikaciju za evidenciju kurseva i polaznika.


Cilj zadatka

Cilj ovog zadatka je da primenite znanje o korišćenju AI alata u realnom procesu razvoja web aplikacije. Kroz zadatak treba da pokažete da umete da osmislite ideju, napišete kvalitetne promptove, generišete React aplikaciju pomoću Lovablea, povežete aplikaciju sa Supabase backend servisom i bazom podataka i testirate osnovne funkcionalnosti aplikacije.


Zadaci

Osmislite temu svoje web aplikacije.

Napišite početni prompt za Lovable u kom jasno opisujete:

naziv aplikacije,

cilj aplikacije,

tipove korisnika,

glavne stranice,

glavne funkcionalnosti,

podatke koji treba da se čuvaju u bazi,

izgled i stil korisničkog interfejsa.
(Što je prompt detaljniji i jasniji, to će početni rezultat biti kvalitetniji.)




Kreirajte aplikaciju pomoću Lovablea.

Aplikacija treba da sadrži najmanje tri stranice, na primer:

početnu stranicu,

stranicu za unos podataka,

stranicu za prikaz korisnika i pozajmljenih knjiga



Aplikacija treba da sadrži navigaciju između stranica.

Aplikacija treba da sadrži najmanje jednu formu za unos podataka.

Podaci uneti kroz formu treba da se čuvaju u Supabase bazi podataka.

Aplikacija treba da prikazuje podatke iz baze na posebnoj stranici.

Potrebno je omogućiti prikaz detalja za jedan izabrani zapis. Na primer, u aplikaciji za biblioteku, klikom na ime korisnika prikazuje se spisak knjiga koje je korisnik pozajmio.

Aplikacija treba da sadrži osnovnu autentikaciju korisnika:

registraciju,

logovanje,

odjavu korisnika.



Potrebno je testirati aplikaciju i proveriti:

da li registracija radi,

da li logovanje radi,

da li se podaci uspešno čuvaju,

da li se podaci uspešno prikazuju,

da li aplikacija radi bez grešaka u konzoli.



Na kraju zadatka potrebno je objaviti aplikaciju. Za objavljivanje možete koristiti opciju Lovable Deploy, Netlify ili Vercel.


NAPOMENA

Lovable Free plan ima ograničen broj dnevnih kredita za generisanje aplikacija i izmenu postojećih projekata. Zbog toga je važno da pre slanja prvog prompta pažljivo osmislite ideju i jasno definišete funkcionalnosti koje želite da aplikacija sadrži.

Preporučuje se da najpre u tekstualnom editoru popišete osnovne zahteve aplikacije, a zatim sastavite što detaljniji početni prompt. Kvalitetniji prompt obično dovodi do boljeg početnog rezultata i manjeg broja potrebnih izmena.

Ukoliko tokom rada potrošite sve dostupne dnevne kredite, nema potrebe da kreirate novi nalog ili menjate alat. Sačekajte naredni dan, kada će vam biti dodeljeni novi krediti, i nastavite razvoj aplikacije tamo gde ste stali.

 

Proces ocenjivanja

Koordinator kursa će pregledati vaš rad i dati povratnu informaciju u roku od 24 sata. Ako dobijete komentare i savete, imaćete priliku da jednom izmenite i ponovo pošaljete svoj rad.


Kriterijumi ocenjivanja

Ocenjivanje se vrši prema sledećim kriterijumima:

Ideja i jasnoća aplikacijeDa li aplikacija ima jasnu namenu i realan scenario upotrebe?Kvalitet promptaDa li je prompt jasno napisan i da li sadrži dovoljno informacija za generisanje aplikacije?Korišćenje LovableaDa li je aplikacija uspešno kreirana pomoću Lovablea?Korisnički interfejsDa li aplikacija ima pregledan, moderan i funkcionalan dizajn?NavigacijaDa li korisnik može lako da se kreće kroz aplikaciju?Forma za unos podatakaDa li forma radi pravilno i da li su polja jasno definisana?Povezivanje sa Supabase bazomDa li se podaci uspešno čuvaju u bazi? Da li su stateovi jasno definisani?Prikaz podatakaDa li se podaci iz baze pravilno prikazuju u aplikaciji?AutentikacijaDa li aplikacija sadrži registraciju, logovanje i odjavu korisnika?Prikaz detaljaDa li aplikacija omogućava prikaz detalja za izabrani zapis?TestiranjeDa li su testirane glavne funkcionalnosti aplikacije?Dokumentacija projektaDa li je predat kratak i jasan opis projekta?

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
