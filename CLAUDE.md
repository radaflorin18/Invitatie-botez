# Invitatie-botez - Project Rules

> Adauga la regulile globale din ~/.claude/CLAUDE.md, nu le inlocuieste.

## 1. Format: Carousel (MUST)

Invitatia are formatul **Carousel**: slide-uri orizontale (intro, biserica,
petrecere, printesa, RSVP - in aceasta ordine, RSVP ramane ultimul) cu
navigare prin swipe, sageti, puncte si tastatura. Nu se trece la pagina lunga
cu scroll vertical si nu se elimina caruselul, decat la cererea explicita a
userului. Adaugarea/stergerea unui slide se reflecta in `index.html` (sectiuni
+ puncte de navigare), `style.css` si `script.js`.

## 2. Mobile-first (MUST)

Site-ul e o invitatie digitala trimisa pe WhatsApp/mesaje si deschisa aproape
exclusiv pe telefon. Optimizarea pentru mobil este prioritatea nr. 1.

- Viewport meta tag (`width=device-width, initial-scale=1.0`) obligatoriu.
- Fara scroll orizontal la nicio latime de ecran (testeaza cel putin 360px,
  390px, 430px).
- Textul ramane in interiorul chenarului, fara suprapuneri sau taieturi, la
  360px, 390px si 430px.
- Zone de atins (butoane, linkuri, puncte de navigare) de minim ~40x40px.
- Interactiunile principale (navigare carusel) trebuie sa functioneze prin
  swipe/tap, nu doar prin hover (hover e doar un bonus pentru desktop).
- Fonturi si asset-uri externe minime, ca sa se incarce rapid pe conexiuni
  mobile slabe (imaginile din `img/` sub ~200 KB in total).
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
  simplu, fara diacritice. Acelasi lucru pentru acest fisier.

## 4. Testare obligatorie dupa fiecare modificare (MUST)

Dupa orice schimbare in `index.html`, `style.css`, `script.js` sau `img/`,
linkurile si functionalitatea se reverifica, inainte de a declara task-ul
terminat, folosind **Chrome sau Edge headless** (nu doar citind codul). Chrome
si Edge exista pe aceasta masina (`C:\Program Files\Google\Chrome`,
`C:\Program Files (x86)\Microsoft\Edge`). Scripturile de test si capturile se
tin in scratchpad, nu in repo.

**Cum se testeaza**

- Randare la latimea telefonului: fereastra headless are minim ~500px, deci
  pagina se incarca intr-un `<iframe>` de 390px (si 360px / 430px) si se
  fotografiaza cu `--screenshot`. Slide-ul dorit se alege printr-un `#hash`
  intr-o copie de test a `script.js` (nu in site).
- Test de comportament: o pagina de test incarca `script.js` real si un script
  care apasa sagetile si punctele, trimite taste si evenimente touch si scrie
  rezultatul (PASS/FAIL) in DOM, citit cu `--dump-dom`.
- Masuratori de layout (inaltimi, latimi) se fac in interiorul iframe-ului de
  390px (Chrome cu `--allow-file-access-from-files`), nu in fereastra de 500px.
- Capturile se deschid si se inspecteaza vizual; un test verde nu inlocuieste
  privitul la rezultat.

**Ce se verifica**

- **Structura carusel**: 5 slide-uri in ordinea din sectiunea 1, 5 puncte de
  navigare, doar slide-ul activ nu este `inert`.
- **Navigare**: sageti (cu revenire la capete), puncte, tastatura stanga/dreapta
  si swipe orizontal; un drag mic (<40px) si un gest mai mult vertical decat
  orizontal NU schimba slide-ul.
- **Linkuri interne**: fiecare `href`/`src` (CSS, JS, fonturi, imagini) se
  rezolva; toate imaginile din pagina se incarca (`naturalWidth > 0`); toate
  `<use href="#...">` au tinta.
- **Linkuri externe**: linkurile `tel:` au numerele din sectiunea 8; parametrul
  `query` al linkurilor Google Maps decodeaza la valorile din sectiunea 8.
  Google Maps in Chrome headless afiseaza un ecran de consimtamant pentru
  cookie-uri, deci rezultatul real nu se poate vedea automat; consimtamantul nu
  se accepta in numele userului. Linkurile se verifica structural, iar userul
  le confirma manual.
- **HTML valid**: fara tag-uri neinchise, fara `&` neescapat in atribute
  (`&amp;`, inclusiv in URL-ul Google Fonts), fara clase/id-uri referite in
  CSS/JS care nu exista in HTML.
- **Layout**: fara scroll orizontal la 360/390/430px, textul in chenar.
- **Uniformitate**: doar fontul Pinyon Script / Playfair Display / Montserrat,
  fara elemente vechi (fundite, fluturi, flori desenate), liniile chenarului
  prezente pe `.slide` (sectiunea 6).
- **ASCII**: `grep -n '[^ -~\t]' index.html style.css script.js CLAUDE.md`
  nu gaseste nimic (diacriticele sunt entitati ASCII).
- **JPEG** regenerat si verificat vizual daca s-a schimbat template-ul
  (sectiunea 5).
- Daca o unealta lipseste, spune explicit userului ce NU a fost testat vizual,
  in loc sa declari succesul fara sa verifici.

## 5. Imaginea JPEG se regenereaza la fiecare schimbare de template (MUST)

`invitatie-botez.jpg` este imaginea statica principala a invitatiei, cu toate
datele (nume, parinti, nasi, data, biserica, petrecere, RSVP). La **orice
schimbare de template** - continut, text, stil, decor sau layout in
`index.html`/`style.css`/`img/` - sau de date (sectiunea 8), JPEG-ul se
regenereaza in aceeasi interventie, altfel ramane invechit fata de site.

- Continut: slide-ul "printesa" (erou, poezie, toate datele) urmat de textul
  slide-ului "RSVP" (titlu, text, contacte) si banda de flori de jos,
  aplatizate intr-un singur card vertical (celelalte slide-uri repeta aceleasi
  date si nu intra in imagine).
- Se genereaza din aceleasi HTML/CSS, la 390px latime, randat cu Chrome/Edge
  headless la scara 2x (780px), decupat exact pe inaltimea cardului si salvat
  JPEG calitate 92.
- Inaltimea cardului se masoara in interiorul unui iframe de 390px (Chrome cu
  `--allow-file-access-from-files`), nu in fereastra headless de 500px, unde
  regulile `max-width: 480px` nu se aplica si inaltimea iese gresita.
- In imagine nu apar butoanele de navigare si "Vezi pe harta".
- Dupa regenerare, imaginea se deschide si se verifica vizual (text complet,
  diacritice corecte, fara zone taiate, fara dunga goala jos, chenar inchis).

## 6. Uniformitate vizuala (MUST)

Toate slide-urile arata ca o singura invitatie. La orice slide nou sau
modificat se pastreaza:

- **Acelasi font**: doar cele 3 familii deja folosite - Pinyon Script (nume,
  titluri si replici script), Playfair Display (date, cifre mari) si
  Montserrat (text curent, majuscule). Nu se adauga alte fonturi si nu se
  copiaza fontul din sabloanele externe.
- **Acelasi fundal**: ivoriu/perlat, ca in `Templates/printesa_2.jpeg`
  (`--paper` + gradient + zgomot fin pe `.carousel-container`). Slide-urile nu
  au fundal propriu; nu se pun dreptunghiuri de imagine cu fundalul lor.
- **Aceeasi paleta**: doar variabilele CSS din `:root` (roz, roz inchis, brun
  pentru text, auriu).
- **Acelasi chenar si aceleasi elemente decorative pe toate slide-urile**:
  chenarul dublu auriu cu colturi filigranate (liniile laterale din CSS pe
  `.slide`, plus benzile `img/top.jpg` si `img/bottom.jpg`), buchetele 3D de
  crini (`img/bloom-left.jpg`, `img/bloom-right.jpg`) si stelele aurii
  (`<symbol id="spark">`). Fundite, fluturi, libelule si flori desenate NU se
  mai folosesc.
- **Aceleasi elemente de text/UI**: acelasi rol arata identic peste tot. Un
  slide nou refoloseste componentele existente (`.label`, `.place`,
  `.address`, `.time`, `.invite`, `.child-name`, `.script-title`,
  `.map-link`, `.contact-row`, `.nav`) si aceleasi benzi/clase de decor. Nu se
  creeaza variante noi (alt buton, alt marime de titlu, alta culoare) daca
  exista deja o componenta pentru acelasi rol; diferentele pe un slide dens se
  fac doar prin suprascriere locala minima.
- **Exceptie sanctionata**: eroul cu coroana, fetita si lumanarile
  (`img/hero.jpg`) apare doar pe slide-ul "printesa".
- Clasele noi din `style.css` se adauga doar daca nu exista deja una pentru
  acelasi rol (grep inainte).

## 7. Imagini din sablon (img/)

Imaginile vin din `Templates/printesa_2.jpeg` (sablonul activ;
`Templates/printesa.jpg` este sablonul vechi, nefolosit acum).

- Fisiere: `hero.jpg` 780x600 (coroana, fetita, lumanari, crini), `top.jpg`
  780x107, `bottom.jpg` 780x239, `bloom-left.jpg` si `bloom-right.jpg`
  300x207. Total sub ~200 KB. Toate au `width`/`height`; cele din afara
  primului slide au `loading="lazy"`.
- Extragere: textul din sablon se sterge (pixeli maro/roz inchis din casetele
  liniilor de text, umplere din vecini si estompare in zona centrala);
  coroana din `top.jpg` se acopera cu un gradient cu margini estompate; benzile
  se salveaza JPEG calitate 80 si se topesc in fundal prin `mask-image` in CSS.
- Liniile laterale ale chenarului din CSS sunt la 2.44% / 4% si 95.9% / 97.4%
  din latime, adica exact unde sunt liniile coapte in imagini; nu se schimba
  fara sa se re-masoare pe imagini.
- Slide-ul "printesa" este mai inalt decat ecranul si se deruleaza vertical in
  interior; gestul vertical nu trebuie sa schimbe slide-ul (verificat in test).

## 8. Date reale ale evenimentului (sursa unica de adevar)

Acesta este scenariul real, nu placeholder. Orice text, link sau test trebuie
sa se potriveasca exact cu aceste date.

- Copil: Sofia-Maria. Parinti: Florin si Ramona.
- Nasi: Claus si Daniela / Viorica si Dumitru (doua perechi).
- Data: Sambata, 31 Octombrie 2026.
- Biserica: "Sf. Mucenic Mina", Str. Horia Creanga, Nr. 2, Timisoara, ora 15:00.
- Petrecere: Ivy Events - Sala Silver, Str. Avram Imbroane 90, Timisoara, ora 16:00.
- RSVP pana la 18 Octombrie: Florin 0745268956, Ramona 0756492610.
- Poezia de la inceput si "Abia astept sa va intalnesc!" raman neschimbate.

**Linkuri Google Maps** (decizie a userului, 2026-09-20): raman cele
existente, care s-au dovedit valide. Biserica: "Biserica Sf. Mucenic Mina,
Str. Horia Creanga, Nr. 2, Timisoara". Petrecere: "Ivy Events, Str. Avram
Imbroane 90, Timisoara" (fara "Sala Silver", ca sa nu strice cautarea). Nu
exista o locatie mai precisa disponibila; cand exista (link direct catre loc),
se inlocuieste linkul si se actualizeaza aceasta sectiune. Sala Silver si
orasul se actualizeaza doar in textul invitatiei.

Verificare de adrese (2026-09-20, OpenStreetMap): Strada Horia Creanga exista
in Timisoara, iar Biserica Sfantul Mare Mucenic Mina este in imediata
apropiere; Strada Avram Imbroane exista, dar "Ivy Events" nu apare in
OpenStreetMap, deci petrecerea nu a putut fi confirmata independent.

Datele apar in mai multe locuri: slide-urile intro, biserica, petrecere,
printesa si RSVP, linkurile `tel:` si Google Maps, testul automat si
`invitatie-botez.jpg`. O schimbare de date se aplica peste tot in aceeasi
interventie (grep dupa valoarea veche in tot repo-ul, apoi fara rezultate),
se regenereaza JPEG-ul si se reruleaza testele cu asertiunile actualizate.

## 9. Teste picate si rezultate neconforme (MUST)

Un rezultat neconform este orice test picat, orice captura care nu arata bine
(suprapuneri, text taiat, chenar nealiniat, dungi goale, margini dure, urme
ramase din sablon, imagine deformata) sau orice date care nu se potrivesc cu
sectiunea 8.

- **Nu se declara terminat** cu teste picate, sarite sau neverificate. Raportul
  spune cifrele reale (ex. "23 trecute, 0 picate") si ce nu a fost testat.
- **Cauza inainte de reparatie**: se citeste mesajul de eroare, se reproduce,
  apoi se stabileste daca e (a) bug real in site, (b) bug in test (asertiune
  gresita) sau (c) artefact de mediu/unealta. Nu se schimba cod la intamplare.
- **Nu se slabeste un test ca sa treaca**: nu se sterge si nu se relaxeaza o
  asertiune fara motiv. Daca testul e gresit, se corecteaza explicit, se spune
  de ce, si se ruleaza din nou toata suita.
- **Dupa fiecare reparatie se reruleaza toata suita**, nu doar testul picat, si
  se regenereaza artefactele dependente (JPEG-ul) daca template-ul s-a schimbat.
- **Se repara clasa de probleme, nu doar instanta**: dupa un bug (ex. un `&`
  neescapat) se cauta acelasi tipar in tot repo-ul (`grep`), nu doar in locul
  raportat.
- **Se verifica ca modificarea s-a aplicat**: dupa `sed`, script PowerShell sau
  generare de imagini se confirma ca fisierul s-a schimbat (grep, dimensiune,
  data) si se citesc erorile scriptului. O eroare tacuta poate lasa fisiere
  vechi si te poate face sa evaluezi rezultatul gresit. Iesirile lungi de
  eroare se redirectioneaza intr-un fisier si se citeste doar coada.
- **Capcane cunoscute in acest proiect** (verifica-le inainte sa dai vina pe
  site):
  - fereastra headless are latime minima ~500px, deci capturile/masuratorile
    la telefon se fac in iframe de 390px (sectiunile 4 si 5);
  - `sed` cu delimitatorul `#` se strica pe culori (`#000`), iar in PowerShell
    `$B` si `$b` sunt aceeasi variabila (nume de variabile distincte);
  - asertiunile de tip "exact 3 imagini" se rup cand se schimba template-ul;
  - in `sed` (GNU), `\u` din partea de inlocuire inseamna "majuscula" si
    backslash-ul dispare (`backslash+u0219` devine `0219`): pentru caractere speciale
    in teste se foloseste `String.fromCharCode(...)` sau un fisier scris cu
    heredoc, apoi se verifica cu `grep` ce s-a scris efectiv;
  - Google Maps in headless arata ecran de cookie-uri (vezi sectiunea 4).
- **Rezultat neplacut vizual = esec**: se repara, se rerandeaza si se
  reinspecteaza; "aproape bine" nu se accepta, iar problema nu se ascunde.
- **Esec inexplicabil**: daca dupa cateva incercari rezonabile cauza ramane
  necunoscuta, se spune clar userului ce s-a incercat si ce s-a exclus, in loc
  sa se reia testul pana trece intamplator sau sa se treaca cu vederea.
- **Lectii noi**: cand o reparatie scoate la iveala o capcana noua, se adauga
  o linie scurta in lista de mai sus, ca sa nu se repete.
- Codul de depanare si fisierele de test nu raman in site/repo.

## 10. Structura si git

- `index.html`, `style.css`, `script.js` (site), `img/` (imagini din sablon),
  `Templates/` (sabloane sursa, nefolosite direct de site),
  `invitatie-botez.jpg` (imaginea statica), `CLAUDE.md` (aceste reguli).
- Site static pe GitHub Pages, fara build si fara dependente.
- Commit si push doar la cererea explicita a userului (regula globala de git).
