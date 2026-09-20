# Invitatie-botez - Project Rules

> Adauga la regulile globale din ~/.claude/CLAUDE.md, nu le inlocuieste.

## 1. Mobile-first (MUST)

Site-ul e o invitatie digitala trimisa pe WhatsApp/mesaje si deschisa aproape
exclusiv pe telefon. Optimizarea pentru mobil este prioritatea nr. 1.

- Viewport meta tag (`width=device-width, initial-scale=1.0`) obligatoriu.
- Fara scroll orizontal la nicio latime de ecran (testeaza cel putin 360px,
  390px, 430px).
- Zone de atins (butoane, linkuri, puncte de navigare) de minim ~40x40px.
- Interactiunile principale (navigare carusel) trebuie sa functioneze prin
  swipe/tap, nu doar prin hover (hover e doar un bonus pentru desktop).
- Fonturi si asset-uri externe minime, ca sa se incarce rapid pe conexiuni
  mobile slabe.
- Orice adaugire noua (sectiune, buton, imagine) se verifica intai la latime
  de mobil, apoi la desktop.

## 2. Diacritice romanesti in text (exceptie de la regula ASCII globala)

Regula globala ASCII-only ramane in vigoare pentru cod, comentarii, mesaje de
commit etc. Pentru **textul vizibil pe pagina** (titluri, paragrafe, butoane,
RSVP), diacriticele romanesti corecte sunt cerute explicit de user si sunt
aprobate ca regula permanenta pentru acest proiect - nu mai e nevoie sa se
ceara aprobare din nou per ocurenta.

- Scrie diacriticele (a, a, i, s, t / A, A, I, S, T) ca entitati HTML
  numerice ASCII (`&#259;`, `&#226;`, `&#238;`, `&#537;`, `&#539;` si
  variantele majuscule `&#258;`, `&#194;`, `&#206;`, `&#536;`, `&#538;`),
  niciodata ca bytes UTF-8 literali in fisier. Asa fisierul ramane ASCII pe
  disc, dar pagina afiseaza diacritice corecte in browser.
- Codul (nume de clase/id-uri, comentarii, variabile JS/CSS) ramane ASCII
  simplu, fara diacritice.

## 3. Testare obligatorie dupa fiecare modificare (MUST)

Dupa orice schimbare in `index.html`, `style.css` sau `script.js`, verifica
inainte de a declara task-ul terminat:

- **Linkuri**: fiecare `href`/`src` intern (CSS, JS, fonturi) se rezolva; nu
  raman legaturi rupte catre fisiere sterse/redenumite.
- **Linkuri externe**: linkurile `tel:` au numerele corecte; linkurile catre
  Google Maps deschid adresa corecta (verifica manual URL-ul construit).
- **Functionalitate carusel**: navigare cu sageti, puncte, tastatura
  (stanga/dreapta) si swipe raman sincronizate intre `index.html` (numar de
  slide-uri/dots), `style.css` (clase folosite) si `script.js` (selectori).
- **HTML valid**: fara tag-uri neinchise, fara `&` neescapat in atribute
  (`&amp;`), fara clase/id-uri referite in CSS/JS care nu exista in HTML.
- **ASCII check**: `grep -n '[^ -~\t]' index.html style.css script.js`
  trebuie sa nu gaseasca nimic (diacriticele sunt entitati ASCII, deci raman
  in afara acestui grep).
- **invitatie-botez.jpg**: imaginea statica cu toate datele (nume, parinti,
  data, biserica, petrecere, RSVP). Orice schimbare de continut in
  `index.html` (ex. adaugarea nasilor) cere regenerarea ei, altfel ramane
  invechita. Se genereaza din aceleasi HTML/CSS, aplatizat intr-un singur card
  de 390px latime, randat cu Chrome headless la scara 2x (780px), salvat JPEG
  calitate 92, fara butoanele "Vezi pe harta".
- Chrome/Edge headless exista pe aceasta masina si permit test vizual real
  (randare la 390px prin iframe, deoarece fereastra headless are minim ~500px).
- Daca in mediul curent nu exista unealta de browser automation (Playwright
  etc.) sau server local (Node/Python) pentru a testa vizual, spune explicit
  userului ce NU a fost testat vizual, in loc sa declari succesul fara sa
  verifici. Nu presupune ca merge doar pentru ca fisierele arata corect.
