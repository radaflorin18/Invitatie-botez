# Invitatie-botez - Project Rules

> Adauga la regulile globale din ~/.claude/CLAUDE.md, nu le inlocuieste.

## 1. Format: Carousel (MUST)

Invitatia are formatul **Carousel**: slide-uri orizontale (intro, biserica,
petrecere, printesa, RSVP - in aceasta ordine, RSVP ramane ultimul) cu navigare prin swipe, sageti, puncte si tastatura. Nu se
trece la pagina lunga cu scroll vertical si nu se elimina caruselul, decat la
cererea explicita a userului. Adaugarea/stergerea unui slide se reflecta in
`index.html` (sectiuni + puncte de navigare), `style.css` si `script.js`.

## 2. Mobile-first (MUST)

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

## 3. Diacritice romanesti in text (exceptie de la regula ASCII globala)

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

## 4. Testare obligatorie dupa fiecare modificare (MUST)

Dupa orice schimbare in `index.html`, `style.css` sau `script.js`, linkurile
si functionalitatea se reverifica, inainte de a declara task-ul terminat,
folosind **Chrome sau Edge headless** (nu doar citind codul): randare la 390px
(prin iframe, fereastra headless are minim ~500px) si un test automat care
apasa sagetile/punctele, trimite taste si swipe si citeste starea rezultata.
Verifica:

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
- Chrome si Edge exista pe aceasta masina (C:\Program Files\Google\Chrome,
  C:\Program Files (x86)\Microsoft\Edge).
- Daca in mediul curent nu exista unealta de browser automation (Playwright
  etc.) sau server local (Node/Python) pentru a testa vizual, spune explicit
  userului ce NU a fost testat vizual, in loc sa declari succesul fara sa
  verifici. Nu presupune ca merge doar pentru ca fisierele arata corect.

## 5. Imaginea JPEG se regenereaza la fiecare schimbare de template (MUST)

`invitatie-botez.jpg` este imaginea statica principala a invitatiei, cu toate
datele (nume, parinti, nasi, data, biserica, petrecere, RSVP). La **orice
schimbare de template** - continut, text, stil, decor sau layout in
`index.html`/`style.css`/`img/` - JPEG-ul se regenereaza in aceeasi
interventie, altfel ramane invechit fata de site.

- Continut: slide-ul "printesa" urmat de slide-ul "RSVP", aplatizate intr-un
  singur card vertical (celelalte slide-uri repeta aceleasi date si nu intra
  in imagine). Baza fondului castelului se estompeaza in hartie ca sa nu apara
  o margine taiata.
- Se genereaza din aceleasi HTML/CSS, la 390px latime, randat cu Chrome/Edge
  headless la scara 2x (780px), decupat exact pe inaltimea cardului si salvat
  JPEG calitate 92.
- In imagine nu apar butoanele de navigare si "Vezi pe harta".
- Dupa regenerare, imaginea se deschide si se verifica vizual (text complet,
  diacritice corecte, fara zone taiate).

## 6. Uniformitate vizuala (MUST)

Toate slide-urile arata ca o singura invitatie. La orice slide nou sau
modificat se pastreaza:

- **Acelasi font**: doar cele 3 familii deja folosite - Pinyon Script (nume,
  titluri si replici script), Playfair Display (date, cifre mari) si
  Montserrat (text curent, majuscule). Nu se adauga alte fonturi si nu se
  copiaza fontul din sabloanele externe.
- **Acelasi fundal/template**: hartie crem cu textura fina (`--paper` +
  zgomot pe `.carousel-container`). Slide-urile nu au fundal propriu; nu se
  pun dreptunghiuri de imagine cu fundalul lor.
- **Aceeasi paleta**: doar variabilele CSS din `:root` (roz, auriu, cerneala).
- Verificarea de fonturi face parte din testul headless: elementele cu text
  din slide-uri trebuie sa foloseasca strict cele 3 familii.

## 7. Ilustratii din sabloane (img/)

Ilustratiile din `Templates/printesa.jpg` (caleasca, printesa, castel) sunt
folosite in slide-ul "printesa" ca **PNG transparent** din `img/`, ca sa
stea pe fundalul comun.

- Extragere: decupare + color-to-alpha pe culoarea hartiei din sablon
  (RGB 246,243,237, prag 0.07), cu stergerea resturilor de text/nori din
  jur; culorile se cuantizeaza usor ca PNG-ul sa fie mic.
- Dimensiuni (~2x fata de afisare): caleasca 300x202, printesa 220x331,
  castel 380x396; greutate totala sub ~400 KB. Imaginile au `width`/`height`
  si `loading="lazy"`.
- `Templates/` ramane sursa originala; se editeaza doar `img/` si slide-ul.
- Slide-ul "printesa" este mai inalt decat ecranul si se deruleaza vertical in
  interior; gestul vertical nu trebuie sa schimbe slide-ul (verificat in test).
