# Williams Art: projectdossier nieuwe website

> Lees dit eerst bij elk nieuw gesprek. Laatst bijgewerkt: 25 november 2026.
> Status: **fase 1 (intake) afgerond**: alle inhoud verzameld. Wacht op antwoorden op de intakevragen (onderaan) voor fase 2 (richting).

---

## 1. De opdracht in het kort

- **Klant:** William Roobrouck, beeldhouwer/kunstenaar, merknaam **Williams** (op de oude site: "Williams Design", domein williams-art-design.com).
- **Wij:** Wizarts (Jasper). Voorstel aan de klant gedaan in oktober 2026 (`info/Williams – waarom deze nieuwe website.pdf`).
- **Vraag:** een nieuwe website in HTML/CSS/JS (eventueel met animaties en parallax), in de stijl van de schets van de brand designer (`info/williams-website.html`). De klant was daar heel tevreden over. De stijl blijft, maar alles moet **chiquer** worden en **beter uitgerust met info**, op een goede manier.
- **Mogelijk later:** omzetten naar WordPress (via `wp-builder-agent`, zie de globale CLAUDE.md). De oude site draait nu op WordPress met Polylang (NL/FR/EN/DE).

## 2. Bronnen en waar ze staan

| Wat | Pad |
|---|---|
| Schets van de brand designer (goedgekeurde stijl) | `info/williams-website.html` |
| Klantvoorstel (8 slides, de "waarom") | `info/Williams – waarom deze nieuwe website.pdf` |
| Alle inhoud van de oude site (teksten, werken, pagina's in 4 talen, SEO) | `data/content.json` |
| Lijst van alle gedownloade bestanden (bron-URL, breedte, hoogte, alt) | `data/manifest.json` |
| Foto's per werk (cover, galerij, making-of) | `assets/origineel/werken/<werk>/` |
| Foto's van pagina's (homepage-events, SEO-pagina's) | `assets/origineel/paginas/` |
| Logo's en favicon | `assets/origineel/logo/` |
| Video's | `assets/origineel/video/` |
| Screenshots van referenties | `info/screenshots/` |
| Duitse vertaling: stemkaart en woordenlijst NL→DE | `../originele site/williams-art-originele-site/vertaling-de/stemkaart-en-woordenlijst.md` |
| Backup van de oude WP-database (voor DE) | `../originele site/backups/pre-de-20261125.sql` |

**Assets:** 392 bestanden, 545 MB (werken 215 MB, video 327 MB). Foto's zijn de grootste webversie uit de mediabibliotheek (meestal 2560 px, "-scaled"). 59 foto's zijn kleiner dan 1200 px breed: niet gebruiken voor groot beeld. Hoge-resolutiefoto's en een vectorlogo zijn bij William aangevraagd (zie de PDF, slide 7).

## 3. Contactgegevens en bedrijf

- **Williams**, William Roobrouck
- Veldstraat 9, 9270 Laarne (atelier, woont en werkt in Laarne sinds ±2008)
- 0497 53 51 58 · roobrouck.william@gmail.com
- Btw: BE 0771 792 178
- Instagram: https://www.instagram.com/williams.art.design/
- Facebook: https://www.facebook.com/WilliamsArtDesign/
- Slogan (niet vertalen): **"The Love story of art & craft"**
- Formulier oude site (Gravity Forms): Naam, E-mail*, Telefoon*, Onderwerp, Opmerking, akkoord privacyverklaring*

## 4. Merk en stijl

### Oud logo
`assets/origineel/logo/Williams-logo.png`: een schuin, handgeschreven script-"Williams", verticaal gedraaid. Varianten: `black-logo.png`, `logowilliams.png`, `favicon.jpg`. **Geen vectorlogo**: aangevraagd.

### Schets van de brand designer (`info/williams-website.html`): dit is de stijl die blijft
- **Gebaseerd op Walter Schupfer Management (wschupfer.com/london)**: wit, zwart, veel lucht, beeld centraal.
- Kleuren: `--ink #000`, `--mute #8a8a8a`, `--line #e6e6e6`, `--soft #f7f7f7`, `--bg #fff`.
- Fonts: **Inter** (body 15/21), **Barlow Condensed** (titels, UPPERCASE), **Outfit 500** (woordmerk "williams" in kleine letters, strak gespatieerd).
- Header: hamburger links die het menu horizontaal openklapt; rechts het kleine woordmerk (verschijnt na scrollen op home) en de taalkiezer met een bolletje.
- Menu: Werk (submenu: Alle werken / Cortenstalen beelden / Abstracte tuinbeelden / Grote tuinbeelden) · Agenda · Over William · Opdrachten · Contact · Instagram.
- **Home:** groot woordmerk "williams", daarna 4 **bewegende fotostroken** (oneindige marquee, pauze bij hover), met afwisselende hoogtes en uitlijning per tegel. Hover toont een donkere laag met de titel. Een chevron scrolt naar de volgende strook.
- **Werk:** wissel tussen *Lijst* (titels in 2 kolommen, hover toont 2 voorbeeldfoto's rechts) en *Beeld* (raster).
- **Werkpagina:** grote titel, "scattered" raster in 4 kolommen (foto's verspringen), info-blok met Over dit werk / Gegevens / Informeer naar dit werk (e-mailveld), vorige/volgende, lightbox.
- **Categoriepagina's** (de 3 SEO-pagina's): lead, raster, 3 tekstblokken, "Zo ontstaat een beeld" in 4 stappen.
- **Agenda:** per jaar, met de rijen evenement / plaats / datum.
- **Over William:** lead, video, 4 tekstblokken, foto's.
- **Opdrachten:** Tuin en bedrijf, Events, foto's, werkwijze in 4 stappen.
- **Contact:** adres, contactgegevens, formulier met onderwerp (Interesse in een werk / Werk op maat / Event / Andere vraag).
- Footer in lichtgrijs: woordmerk, inschrijving nieuwsbrief, socials, privacy, cookies, "Website door Wizarts".
- Technisch: één HTML-bestand met hash-router. Beelden hotlinkt hij van de oude site.

### Wat het klantvoorstel (PDF) belooft
- Probleem nu: veel tekst en weinig beeld, verouderd uiterlijk, nieuws staat alleen op Instagram en de agenda stopt in 2022.
- Idee: "Een groot beeld verkoop je met sterke foto's": het werk staat centraal en de rest blijft rustig.
- Per pagina: Home = bewegende fotostroken, elk beeld klikbaar · Werk = lijst met voorbeeld of beeldweergave · Werkpagina = galerij, gegevens en een knop om te informeren · Opdrachten = eigen pagina (tuin en bedrijf, events) · Agenda = overzicht per jaar met recente exposities.
- Opbrengst: meer aanvragen per werk, de uitstraling van een galerie (klanten zoals Fujirebio en Tomorrowland), **de vindbaarheid blijft** (de 3 SEO-pagina's houden hun adres en inhoud), eenvoudig aan te vullen.
- Cijfers: 34 werken, **3 talen (NL, FR, EN)**, 3 SEO-pagina's met behoud van adres, 1 aanvraagknop per werk.
- Nodig van William: bevestiging van de indeling per categorie, logo in vector, foto's in hoge resolutie, exposities en events sinds 2023.

> Let op: de oude site heeft sinds 25/11/2026 ook **Duits** (pagina's en werken staan op /de/). Het voorstel spreekt van 3 talen. Navragen of DE meegaat.

## 5. Referentiesites

### wschupfer.com/london (de basis van de schets)
Screenshot: `info/screenshots/schupfer.png`.
- Wit, minimaal, hamburger en zoekknop links, stadkiezer "• London" rechts, groot woordmerk "wsm" links van het midden.
- Op de homepage staan losse beelden **asymmetrisch verspreid** met heel veel witruimte (portret links, landschap rechts, het volgende beeld lager in het midden). Een chevron onderaan.
- Artiestpagina: "Back to…", naam als titel, een horizontale strook beelden op dezelfde hoogte, tabs (Overview / Editorial / … / Profile), projectsecties met kop en raster, onderaan vorige/volgende en terug naar boven.
- Bijschrift **onder** het beeld (naam en klant), beelden met gemengde verhoudingen op een vaste hoogte.

### ulyssesdesanti.com (design dealer en curator, LA/São Paulo, gemaakt door Twoo)
- Opent met een animatie (zwart blokje als loader, daarna beeld/video). In headless Chrome bleef de pagina op de loader staan, dus geen screenshot. **Jasper: stuur desnoods een paar screenshots of een korte schermopname.**
- Structuur uit de DOM: menu *Exhibitions / Spaces / About* plus het e-mailadres inquire@… rechtstreeks in de header. Een beweging in drie woorden, "Sourcing Masterpieces / Curating Spaces / Creating Beauty", komt terug als koptekst en in de footer. Projecten staan in groepen (Designers, Objects, Spaces, Exhibitions, Miscellaneous), met veel video (zo'n 20 "Play"-knoppen). In de footer staan de steden "Los Angeles, USA / São Paulo, BRA".
- Wat we meenemen: de **filmische, galerie-achtige rust**, de grote beelden en video, een cadans van drie woorden ("Ontwerpen. Lassen. Plaatsen."?), de aanvraag direct bereikbaar en een intro-animatie.

## 6. Sitestructuur oud → nieuw (URL's behouden voor SEO)

| Nieuw | Oude URL (NL) | FR | EN | DE |
|---|---|---|---|---|
| Home | `/` | `/fr/homepage/` | `/en/homepage/` | `/de/startseite/` |
| Werk (overzicht) | `/portfolio/` | | | `/de/portfolio/` |
| Werkpagina | `/portfolio/<slug>/` (oude slugs als `item1`, `item3`, `item5-2`!) | | | |
| Cortenstalen beelden (SEO) | `/cortenstaal-tuinkunst/` | `/fr/sculpture-acier-corten/` | `/en/corten-sculpture/` | `/de/cortenstahl-gartenkunst/` |
| Abstracte tuinbeelden (SEO) | `/abstracte-beelden-tuin/` | `/fr/sculpture-abstraite-jardin/` | `/en/abstract-garden-sculpture/` | `/de/abstrakte-gartenskulpturen/` |
| Grote tuinbeelden (SEO) | `/grote-tuinbeelden/` | `/fr/statue-exterieur-xxl/` | `/en/large-garden-statues/` | `/de/grosse-gartenskulpturen/` |
| Agenda | `/agenda/` | `/fr/ordre-du-jour/` | `/en/agenda/` | `/de/veranstaltungen/` |
| Over William | `/over-william/` | `/fr/a-propos-de-william/` | `/en/about-william/` | `/de/ueber-william/` |
| Opdrachten | *(nieuw, was een blok op home)* | | | |
| Contact | `/contact/` | `/fr/contact/` | `/en/contact-me/` | `/de/kontakt/` |
| Privacy / Cookies | `/privacy-policy/`, `/cookie-policy/` | `/fr/privacy-policy/`, `/fr/cookie-policy/` | `/en/…` | `/de/datenschutzerklaerung/`, `/de/cookie-richtlinie/` |

SEO-titels en meta-beschrijvingen per pagina staan in `data/content.json` (`seo_title`, `seo_desc`). Zie de volledige paginalijst in bijlage B.

## 7. Paginateksten van de oude site (NL, de kern)

### Home
- Slogan: *The Love story of art & craft*
- "Mijn werken": *Onder de noemer 'Williams' maakt William Roobrouck objecten, sculpturen, kunstwerken en stukken design waaruit zijn liefde spreekt voor vormen, ruwe materialen en handwerk. Hij vindt zijn inspiratie in de mens en de natuur, en vertaalt dit vaak in gezichten. Van de allereerste schets tot het allerlaatste laspunt – hij doet alles zelf. […] Combineer twee gouden handen en een levendige fantasie met tonnen technische bagage en de leerjaren bij pepe aan zee en je krijgt objecten met een ziel. Ze combineren staal en vuur of ze toveren met licht, maar telkens verbazen ze de mens weer opnieuw.*
- "Hoe kan ik jou helpen?": **Evenementen** (*Wat is er nog origineel? Waar kijken mensen nog van op? Als je volgende evenement meer aandacht verdient dan een muisklik, dan moeten wij eens praten – over vormen en kleuren, over licht en vuur, over materialen en mogelijkheden. Een artistieke invulling kan een grote meerwaarde betekenen.*) en **Eyecatcher voor je tuin** (*Vertel mij waar je naar op zoek bent en ik maak voor jou dat ene object dat je hart sneller doet slaan. Jouw unieke object is genummerd en komt met een echtheidscertificaat.*)
- "Blijf op de hoogte" (Instagram), met recente items en foto's `paginas/will1, will2, will4, will5.jpg`:
  - Wintertentoonstelling Winterbar (will1)
  - Tentoonstelling in Laarne, 14/12 t.e.m. 22/12 (will2)
  - Expositie / kunstenroute Kwa-art @ Kwaremont (will4)
  - Nieuw monumentaal kunstwerk @ Fujirebio, Technologiepark Gent-Zwijnaarde (will5, plus video `Project-Fujirebio.mp4`)

### Over William
- **In het verleden:** geboren in Tienen in 1977, pendelde als kind tussen Gent en De Panne. Vond zijn wederhelft over de taalgrens en vestigde zich rond 2008 in Laarne. Zijn moeder studeerde kunstgeschiedenis en schilderde aquarellen, zijn grootmoeder schilderde met olieverf en zijn grootvader werkte artistiek met metaal. In opa's atelier aan zee (*toeval of niet: Kunstenaarslaan 6, De Panne*) leerde hij als kind boren, lassen en zagen. Hij was ook in de ban van tekenen, keramiek, zeilen, motorrace, metaalbewerking en techniek: een jongen met tomeloze energie en onblusbare nieuwsgierigheid.
- **In het heden:** dezelfde tekst als "Mijn werken" op home.
- Video: `video/01-William-300524.mp4` (portret van William).

### Contact
- *Op zoek naar een eyecatcher voor je tuin?* / *Je organiseert evenementen en zit wel eens met de handen in het haar?* (zelfde teksten als home) + "Contacteer mij".

### SEO-pagina's (volledige tekst in `data/content.json`)
- **Cortenstaal tuinkunst: "balans in robuustheid"**: wat is cortenstaal (patina beschermt zichzelf, een kameleon), onderhoudsvrij en wordt mooier met de jaren, **het proces in 4 stappen** (Ontwerp & uitsnede → Walsen & plooien → Lassen → Het roestproces: verlaat het atelier donkergrijs). William is gespecialiseerd in grote werken. Op maat: verhoudingen, lichtinval, plaatsing.
- **Abstracte beelden tuin: "een spel van vorm & verbeelding"**: waarom abstract (contrast tussen organische natuur en strakke lijnen), materialen **cortenstaal** en **brons** (patina, tijdloos), op maat voor een stadstuin of landschapstuin. Foto's: `paginas/equilibre_01.jpg`, `mystique_men_22.jpg`, `IMG_1043.jpg`.
- **Grote tuinbeelden: "een indrukwekkend statement"**: vakmanschap op grote schaal (constructie, zwaartepunt, windbelasting; lassen, walsen en plooien van zware platen cortenstaal en brons). **Van ontwerp tot plaatsing:** locatiebezoek → fundering (betonpoer, waterpas en stormvast) → transport en installatie. "De impact van grootte". Op maat: hoogte, breedte, materiaal, vorm.

### Agenda (oud, stopt in 2022)
- **2024** (van de homepage): Wintertentoonstelling Winterbar · Tentoonstelling Laarne 14/12–22/12 · Kwa-art Kwaremont · Fujirebio Zwijnaarde
- **2022:** Biënnale Artbox Expo, Venetië (08/03–30/07) · Tuindagen Kasteel Beervelde (6–8 mei en 7–9 oktober) · Tentoonstelling CC Scharpoord, Knokke-Heist (26–29 mei en 4–6 juni) · Expo "De zomer van Wechel", Kasteel Wechelderzande, Lille (weekends 13/08–28/08)
- **2021:** Artbox Expo Zürich · Kunst in het dorp, OC Ter Loo, Bellingen · Zomerexpositie De Maalderij, Zaffelare · Lak@rt Kunstroute Laarne
- **2020:** Zomerexpositie De Maalderij, Zaffelare · Art Knokke-Heist
- **2019:** Through Your Eyes, RHS Hampton Court Palace, Londen (zilveren medaille) · Art Center Horus, Latem · Buiten Beeld, CC Scharpoord, Knokke-Heist · Beeldentuin Ravesteyn, Heenvliet (Rotterdam) · Beeldenroute Lo-Reninge · Expo Janot, Beersel · Lak@rt, Garmijnzaal, Brugge · Kunstenroute Lak@rt, Laarne
- **2018:** Mystique Sphere, RHS Hampton Court Palace, Londen (artikel RHS "Elements Mystique Garden")
- **Locaties uit de WP-taxonomie die nergens zichtbaar zijn** (mogelijk extra agenda-info om na te vragen): Bbrut The hidden place (bij Knokke), Belgische ambassade (Berlijn), Bonnieux (Provence, "une sieste en Luberon"), Horus gallery (Sint-Martens-Latem, Laren NL, Knokke), Kasteel Gaasbeek, L'ombre (Pittem), Martinshotels (Bilzen), Mizart gallery (Zutendaal), Oostvoorne (NL), Wiesbaden Nordost (DE), Haaften (NL).
- **Ontbreekt:** alles van 2023 tot nu → aangevraagd bij William.

### Referenties en sterke verhalen (de "proof")
- **Tomorrowland** (2012): 12 vuurpilaren voor het decor, elk jaar opnieuw gebruikt.
- **RHS Hampton Court Palace Garden Festival, Londen**: Mystique Sphere (2018) en Through your eyes (2019, **zilveren medaille**, staat nu in **RHS Garden Wisley**).
- **Stad Knokke-Heist**: kocht *Proud* (9 m hoog, 3,5 ton) voor de rotonde aan de A11/Heistlaan, gemaakt voor de triënnale.
- **ArcelorMittal**: *Division*, gemaakt met Indaten-staal van ArcelorMittal (er is een artikel).
- **Fujirebio**, Technologiepark Zwijnaarde: nieuw monumentaal werk (2024).
- **Park van Beervelde**: meerdere werken (Proud 3 m, Division, Me myself and I, Through your eyes, Mystique Sphere).
- **Café Charlatan, Gent**: Luc De Vos (een ode).
- Expo's in Venetië en Zürich (Artbox).

## 8. De werken (34)

Elke map in `assets/origineel/werken/<werk>/` bevat `00-cover.*` (de uitgelichte foto), `01…nn` (de galerij) en `making-of-01…` ("Kijk mee achter de schermen"). Video's per werk: `Illusion-Pente-3.mov`, `Endless-sphere_3583.mov`, `IMG_1763.mov` en `IMG_7826-Copy.m4v` (nog uit te zoeken bij welk werk die laatste twee horen).

**Opvallend:** ongeveer de helft van de werken heeft **geen tekst** (Deep in the blue, Female Wave, Modele Female, Buddha, Equilibre, Koesteren, Yoni, Twister, Hangjongeren, Omhelzing, Over the edge, Coloured Marbles, Desire Accompli, The Sun, Subtige Sphere). De beschrijvingen in de designerschets bij Omhelzing en Over the edge (hoogte 2 of 4 m, vierkant of rechthoekig) komen **niet** van de oude site: **verifiëren bij William**. "Endless Sphere" en "I – C" staan nog als "NEW! Coming in 2025!". Schrijffout "Divison" moet "Division" worden, "Abscence" is waarschijnlijk "Absence" (navragen of dat bewust is).

**Indeling in categorieën** (voorstel van de designer, **nog te bevestigen door William**):
- *Cortenstalen beelden:* Ring of Hope, Endless Sphere, Layered Sphere, Sphere (welding), Twister, Over the edge, Omhelzing, Through your eyes
- *Abstracte tuinbeelden:* Equilibre, Illusion Pente, Division, Twister, Coloured Marbles, Deep in the blue, Layered Sphere, Mystique Sphere
- *Grote tuinbeelden:* Through your eyes, Omhelzing, Ring of Hope, Proud, Hangjongeren, Tomorrowland, Mystique Men, Me myself and I

## 9. Voorstel: plan van aanpak (nog niet goedgekeurd)

**Techniek**
- Statische site met **echte pagina's en URL's** (geen hash-router zoals in de schets), zodat de oude adressen en de SEO behouden blijven. Werkpagina's krijgen leesbare slugs, met redirects van `item1`, `item3`, `item5-2`… naar de nieuwe slugs.
- Vanilla HTML/CSS/JS. **GSAP + ScrollTrigger** voor reveals, parallax en de gepinde processectie, **Lenis** voor smooth scroll. Alles respecteert `prefers-reduced-motion`.
- Alle werken in één databestand (`data/works.json`): pagina's worden daaruit opgebouwd met een klein buildscript. Zo is "elk nieuw werk één pagina met dezelfde opbouw" (belofte uit de PDF) en wordt de latere WordPress-omzetting eenvoudig (één werk = één CPT-item).
- Beeldpipeline: lokale bestanden (geen hotlinks), omgezet naar AVIF/WebP in 3 breedtes, met `srcset` en lazy loading.
- Eerst NL volledig, daarna FR/EN (teksten liggen klaar in `data/content.json`) en eventueel DE.

**Ontwerp: de schets blijft, maar chiquer**
- Dezelfde basis: wit, zwart, Inter + Barlow Condensed + het woordmerk "williams", de fotostroken, lijst/beeld en het scattered raster.
- Chiquer door: meer lucht en asymmetrie (zoals Schupfer), een warmere witte papiertint, één heel spaarzaam gebruikt **cortenaccent** (roestbruin) voor details, grotere typografische contrasten, bijschriften onder het beeld in plaats van een donkere hover-laag, en vloeiende overgangen tussen pagina's.
- Extra animatie: een intro waarin het woordmerk opbouwt (knipoog naar Ulysses), fotostroken die meeversnellen met de scrollsnelheid, lichte parallax per tegel, een hover-voorbeeld dat de cursor volgt in de lijstweergave, en een gepinde scrollsectie voor het proces van snijden → walsen → lassen → roesten.

**Meer info, op een goede manier**
- **Werkpagina:** een vaste gegevenstabel (materiaal, afmetingen, gewicht, oplage/genummerd, jaar, waar te zien), het verhaal, een strook "Achter de schermen" met making-of-foto's en video, "Informeer naar dit werk" (formulier met het werk al ingevuld, plus de keuze "op maat in andere afmeting"), verwante werken en vorige/volgende.
- **Home:** na de stroken een korte bewijssectie (Tomorrowland · RHS zilver · Proud 9 m in Knokke-Heist · Fujirebio), een teaser "Op maat" met de 4 stappen, de laatste agenda-items en een link naar Instagram.
- **Over William:** de video, plus een tijdlijn (Tienen 1977 → opa's atelier in De Panne → Laarne 2008 → Tomorrowland 2012 → RHS 2018/2019 → Proud Knokke → Fujirebio 2024).
- **Opdrachten:** tuin en bedrijf, events, werkwijze (locatiebezoek → ontwerp → maken in het atelier → fundering, transport en installatie → certificaat), referenties.
- **SEO-pagina's:** volledige tekst behouden, opnieuw vormgegeven met beeld ertussen.
- **Agenda:** per jaar, "binnenkort" bovenaan, oud archief eronder.

**Fases (client-site workflow):** 1 Intake ✅ → 2 Richting (structuur, copy, visuele keuzes) → 3 Bouw → 4 Afwerking (motion, mobiel) → 5 Checks (break-ui, toegankelijkheid). Na elke fase stoppen we voor feedback.

## 10. Beslist (intake, 25/11/2026)

- **Doel:** vooral een portfolio en een plek om contact op te nemen. Geen echte verkoopfunnel: het werk tonen en contact makkelijk maken.
- **Aanbod:** gewoon de werken tonen. Er is geen vaste rangorde tussen kopen, op maat en events.
- **Klant:** iedereen met budget voor kunst. We schrijven niet voor één doelgroep.
- **Prijzen:** nooit tonen, altijd **"prijs op aanvraag"**. De oude site toont ook nergens prijzen. Enkel bij Sphere staat "nog 2 genummerde stuks te koop (8/9 en 9/9)".
- **Visuele skill:** **impeccable** (enkel deze, niet combineren).
- **Talen:** uiteindelijk NL/FR/EN/DE. Het **ontwerp gebeurt in NL**, met de taalkiezer zichtbaar.
- **Nieuwsbrief:** bestaat niet op de oude site. Voorlopig **alleen een ontwerp van een nieuwsbrief-pop-up**, zonder koppeling.
- **Focus nu: alleen de frontend.** Geen backend, formulieren werken nog niet echt.

## 10b. Richting (fase 2), voorgesteld op 25/11/2026

Jasper: "kijk naar de index.html en de voorbeelden". De layout volgt dus de schets van de designer, verfijnd met Schupfer en Ulysses. Er is geen layoutkeuze nodig. Het volledige contract staat in `.impeccable/surfaces/index-html.md`, de productinfo in `PRODUCT.md`.

**Lettertypes (gekozen 25/11):** Tenor Sans (woordmerk, titels in kapitalen, menu, grote cijfers) + Jost (lopende tekst, gegevens). Dit vervangt Barlow Condensed, Inter en Outfit uit de schets. Het staal staat in `info/lettertypes.html`.

## 11. Open vragen

**Aan Jasper (intake):**
1. Wat is de ene hoofdactie? (Voorstel: "Informeer naar een werk / vraag een werk op maat aan".)
2. Het aanbod: bestaande werken kopen, werk op maat (tuin en bedrijf), events. Klopt de volgorde van belang?
3. De ideale klant: particulieren met een grote tuin, bedrijven (zoals Fujirebio), steden en gemeenten, eventorganisatoren?
4. Top 3 bezwaren: prijs onbekend, past het in mijn tuin of plek, plaatsing en transport bij zo'n gewicht?
5. Waar komt het verkeer vandaan: Google (de SEO-pagina's), Instagram, mond-tot-mondreclame, beurzen en exposities?
6. Welke visuele skill: `impeccable`, `design-taste-frontend` of `tastemaker`?
7. Talen: NL/FR/EN zoals in het voorstel, of ook DE (die staat sinds vandaag op de oude site)?
8. Prijzen tonen ("vanaf €…") of altijd "prijs op aanvraag"?
9. De nieuwsbrief in de footer: is er een tool (Mailchimp, …) of laten we die weg?

**Aan William (staat deels al in de PDF):**
- Bevestiging van de categorie-indeling · logo in vector · hoge-resolutiefoto's · exposities en events sinds 2023
- Teksten en gegevens voor de werken zonder tekst (zie §8) · bij welk werk horen `IMG_1763.mov` en `IMG_7826-Copy.m4v` · is "Abscence" bewust zo gespeld · welke werken zijn te koop en welke verkocht · oplages

---

## Bijlage A: werken (gegenereerd uit data/content.json)

| # | Werk | Jaar | Locaties | Foto's / making-of | Map |
|---|---|---|---|---|---|
| 1 | Deep in the blue | – | – | 0 / 1 | `assets/origineel/werken/deep-in-the-blue/` |
| 2 | Mystique Sphere | 2018 | Park Van Beervelde, RHS Londen/Hampton | 9 / 2 | `assets/origineel/werken/mystique-sphere/` |
| 3 | Me, myself and I | 2018 | Park Van Beervelde | 5 / 0 | `assets/origineel/werken/me-myself-and-i/` |
| 4 | Illusion Pente | 2017 | – | 9 / 0 | `assets/origineel/werken/illusion-pente/` |
| 5 | Boeddha | 2017 | – | 3 / 0 | `assets/origineel/werken/boeddha/` |
| 6 | Female Wave | 2019 | – | 9 / 1 | `assets/origineel/werken/female-wave/` |
| 7 | Modele Female | 2020 | – | 9 / 1 | `assets/origineel/werken/modele-female/` |
| 8 | Buddha | 2020 | – | 2 / 1 | `assets/origineel/werken/buddha/` |
| 9 | Layered Sphere | 2021 | – | 11 / 4 | `assets/origineel/werken/layered-sphere/` |
| 10 | Mystique Men | 2022 | – | 31 / 6 | `assets/origineel/werken/mystique-men/` |
| 11 | Equilibre | 2023 | – | 9 / 2 | `assets/origineel/werken/equilibre/` |
| 12 | Koesteren | 2023 | – | 14 / 3 | `assets/origineel/werken/koesteren/` |
| 13 | Abscence | 2021 | – | 10 / 7 | `assets/origineel/werken/abscence/` |
| 14 | Luc De Vos | 2018 | Charlatan (Gent) | 3 / 0 | `assets/origineel/werken/luc-de-vos/` |
| 15 | Yoni | 2020 | – | 15 / 0 | `assets/origineel/werken/yoni/` |
| 16 | Ring of Hope | 2022 | – | 9 / 0 | `assets/origineel/werken/ring-of-hope/` |
| 17 | Sphere | 2020 | – | 13 / 4 | `assets/origineel/werken/sphere/` |
| 18 | Twister | 2018 | – | 4 / 3 | `assets/origineel/werken/twister/` |
| 19 | Hangjongeren | – | – | 3 / 0 | `assets/origineel/werken/hangjongeren/` |
| 20 | Omhelzing | – | – | 13 / 1 | `assets/origineel/werken/omhelzing/` |
| 21 | Over the edge | – | – | 11 / 2 | `assets/origineel/werken/over-the-edge/` |
| 22 | Coloured Marbles | – | – | 10 / 0 | `assets/origineel/werken/coloured-marbles/` |
| 23 | Endless Sphere – NEW! | – | – | 13 / 0 | `assets/origineel/werken/endless-sphere/` |
| 24 | Desire Accompli | – | – | 4 / 0 | `assets/origineel/werken/desire-accompli/` |
| 25 | I – C – NEW! | – | – | 8 / 0 | `assets/origineel/werken/i-c/` |
| 26 | Subtige Men | 2023 | – | 5 / 3 | `assets/origineel/werken/subtige-men/` |
| 27 | The Sun | – | – | 0 / 2 | `assets/origineel/werken/the-sun/` |
| 28 | Subtige Sphere | 2021 | – | 4 / 1 | `assets/origineel/werken/subtige-sphere/` |
| 29 | Showerlady | 2018 | – | 3 / 0 | `assets/origineel/werken/showerlady/` |
| 30 | Desire Perceptible | 2017 | – | 0 / 3 | `assets/origineel/werken/desire-perceptible/` |
| 31 | Divison | 2019 | Park Van Beervelde | 6 / 0 | `assets/origineel/werken/divison/` |
| 32 | Through your eyes | 2019 | Haaften, Park Van Beervelde, Wisley Park (London, Engeland) | 0 / 6 | `assets/origineel/werken/through-your-eyes/` |
| 33 | Tomorrowland fantasy flame pillars | 2012 | Tomorrowland (Boom) | 0 / 4 | `assets/origineel/werken/tomorrowland-fantasy-flame-pillars/` |
| 34 | Proud | 2018 | Knokke (Heistlaan), Park Van Beervelde | 28 / 6 | `assets/origineel/werken/proud/` |

### Teksten en gegevens per werk (origineel, NL)

**Deep in the blue** — oude URL `/portfolio/deep-in-the-blue/` · vertalingen: en: Deep in the blue, fr: Deep in the blue, de: Deep in the blue
> _(geen tekst op de oude site)_

**Mystique Sphere** — oude URL `/portfolio/item5-2/` · vertalingen: en: Mystique Sphere, fr: Mystique Sphere, de: Mystique Sphere
> Dit werk stelt een gevallen meteoor voor die in een stedelijke omgeving is neergestort. De impact heeft bomen verbrand, de omgeving en de vegetatie verschroeid. Ik wil het verhaal vertellen van schoonheid die verborgen is in chaos. Het bewijs dat chaos gepaard gaat met onverwachte schoonheid.  
> afmetingen: diameter 250 cm  
> materiaal: cortenstaal  
> gewicht: 750 kg  
> Artikel RHS – Elements Mystique Garden  

Links: https://www.rhs.org.uk/shows-events/rhs-hampton-court-palace-garden-festival/gardens/2018/Elements-Mystique-Garden

**Me, myself and I** — oude URL `/portfolio/me-myself-and-i/` · vertalingen: en: Me, myself and I, fr: Me, myself and I, de: Me, myself and I
> Dit kunstwerk gaat over de discussie of onenigheid met je innerlijke jezelf.  
> Afmetingen: 2,3 meter hoog, 20 centimeter diep, en 1,9 meter breed.  

**Illusion Pente** — oude URL `/portfolio/illusion-pente/` · vertalingen: en: Illusion Pente, fr: Illusion Pente, de: Illusion Pente
> Een vijfhoek of dodecaëder is een verbazingwekkend en niet voor de hand liggend figuur. Deze fascinatie heeft me uitgedaagd om Illusion Pente te creëren.  
> Afmetingen: ongeveer 1,2 meter diameter, gewicht ongeveer 40 kg.  

**Boeddha** — oude URL `/portfolio/boeddha/` · vertalingen: fr: Boeddha, en: Boeddha, de: Boeddha
> Een spel van licht, diepte en contrast. Boeddha is handmatig getekend en uitgesneden op staal, achterin zit licht verwerkt. Wanneer zien we het licht?  
> Afmetingen: 1,5 meter hoog, 2,3 meter breed en 40 cm diep.  

**Female Wave** — oude URL `/portfolio/female-wave/` · vertalingen: en: Female Wave, fr: Female Wave, de: Female Wave
> _(geen tekst op de oude site)_

**Modele Female** — oude URL `/portfolio/modele-female/` · vertalingen: en: Modele Female, fr: Modele Female, de: Modele Female
> _(geen tekst op de oude site)_

**Buddha** — oude URL `/portfolio/buddha/` · vertalingen: en: Buddha, fr: Buddha, de: Buddha
> _(geen tekst op de oude site)_

**Layered Sphere** — oude URL `/portfolio/layered-sphere/` · vertalingen: en: Layered Sphere, fr: Layered Sphere, de: Layered Sphere
> Dit massief werk in cortenstaal is in drie verschillende afmetingen beschikbaar op 9 genummerde exemplaren in elke afmetingen: 70 cm, 100 cm en 160 cm. Het is een echte eyecatcher in de avond met de juiste verlichting.  

**Mystique Men** — oude URL `/portfolio/mystique-men/` · vertalingen: en: Mystique Men, fr: Mystique Men, de: Mystique Men
> De Mystique man is in verschillende afmetingen beschikbaar: 60 cm op de sokkel en in een grotere versie van 250 cm. Zeer recent is deze ook in brons in het klein gemaakt (30 cm en 60 cm).  

**Equilibre** — oude URL `/portfolio/equilibre/` · vertalingen: en: Equilibre, fr: Equilibre, de: Equilibre
> _(geen tekst op de oude site)_

**Koesteren** — oude URL `/portfolio/koesteren/` · vertalingen: en: Koesteren, fr: Koesteren, de: Koesteren
> _(geen tekst op de oude site)_

**Abscence** — oude URL `/portfolio/abscence/` · vertalingen: en: Abscence, fr: Abscence, de: Abscence
> Een indrukwekkend werk. Van opzij zie je de overweldigende fysieke aanwezigheid van de persoon, terwijl de inhoud de mentale afwezigheid benadrukt. Het weerspiegelt hoe we soms fysiek aanwezig kunnen zijn, maar met onze gedachten ergens anders zitten.  

**Luc De Vos** — oude URL `/portfolio/luc-de-vos/` · vertalingen: en: Luc De Vos, fr: Luc De Vos, de: Luc De Vos
> Een werk voor café Charlatan.  

**Yoni** — oude URL `/portfolio/yoni/` · vertalingen: en: Yoni, fr: Yoni, de: Yoni
> _(geen tekst op de oude site)_

**Ring of Hope** — oude URL `/portfolio/ring-of-hope/` · vertalingen: en: Ring of Hope, fr: Ring of Hope, de: Ring of Hope
> Dit werk, ook in cortenstaal, bestaat op diameter 2 meter, 3 meter, 4 meter en er zijn van elk 8 genummerde stuks. Binnenkort komt deze ook uit in een versie van 8 meter.  

**Sphere** — oude URL `/portfolio/welding_sphere/` · vertalingen: en: Welding Sphere, fr: Welding Sphere, de: Sphere
> Een werk in cortenstaal met een diameter van 160 cm. Er zijn nog 2 genummerde stuks te koop (8/9 en 9/9).  

**Twister** — oude URL `/portfolio/twister/` · vertalingen: en: Twister, fr: Twister, de: Twister
> _(geen tekst op de oude site)_

**Hangjongeren** — oude URL `/portfolio/hangjongeren/` · vertalingen: en: Hangjongeren, fr: Hangjongeren, de: Hangjongeren
> _(geen tekst op de oude site)_

**Omhelzing** — oude URL `/portfolio/omhelzing/` · vertalingen: en: Omhelzing, fr: Omhelzing, de: Omhelzing
> _(geen tekst op de oude site)_

**Over the edge** — oude URL `/portfolio/over-the-edge/` · vertalingen: en: Over the edge, fr: Over the edge, de: Over the edge
> _(geen tekst op de oude site)_

**Coloured Marbles** — oude URL `/portfolio/coloured-marbles/` · vertalingen: en: Coloured Marbles, fr: Coloured Marbles, de: Coloured Marbles
> _(geen tekst op de oude site)_

**Endless Sphere – NEW!** — oude URL `/portfolio/endless-sphere/` · vertalingen: en: Endless Sphere – NEW!, fr: Endless Sphere – NEW!, de: Endless Sphere – NEW!
> Coming in 2025!  

**Desire Accompli** — oude URL `/portfolio/desire-accompli/` · vertalingen: en: Desire Accompli, fr: Desire Accompli, de: Desire Accompli
> _(geen tekst op de oude site)_

**I – C – NEW!** — oude URL `/portfolio/i-c/` · vertalingen: en: I – C – NEW!, fr: I – C – NEW!, de: I – C – NEW!
> Coming in 2025!  

**Subtige Men** — oude URL `/portfolio/subtige-men/` · vertalingen: en: Subtige Men, fr: Subtige Men, de: Subtige Men
> Combinatie van subtiel en tige. Het gaat over een subtiele aanwezigheid want het materiaal is vrij transparant.  

**The Sun** — oude URL `/portfolio/the-sun/` · vertalingen: en: The Sun, fr: The Sun, de: The Sun
> _(geen tekst op de oude site)_

**Subtige Sphere** — oude URL `/portfolio/subtige-sphere/` · vertalingen: en: Subtige Sphere, fr: Subtige Sphere, de: Subtige Sphere
> _(geen tekst op de oude site)_

**Showerlady** — oude URL `/portfolio/showerlady/` · vertalingen: fr: Showerlady, en: Showerlady, de: Showerlady
> Afmetingen: 120 cm hoog, 80 cm breed en 10 cm diep.  
> Materiaal: cortenstaal.  

**Desire Perceptible** — oude URL `/portfolio/item4/` · vertalingen: en: Desire Perceptible, fr: Desire Perceptible, de: Desire Perceptible
> Met de sculptuur sluit William een hoofdstuk in z’n leven af.  
> afmetingen: hoogte 2.5m / breedte 1.5m / diepte 0.6m  
> materiaal: Indaten ©  

**Divison** — oude URL `/portfolio/division/` · vertalingen: en: Divison, de: Divison
> Mijn werk is gebaseerd op 3 broers die uit elkaar groeien naarmate ze ouder worden. Ik beschouw hun geboorte als het centrale punt waardoor ze voor het leven verbonden zijn, maar daarom niet altijd dezelfde visie delen.  
> De 3 broers zijn persoonlijke vrienden van mij, wat mij de unieke kans gaf om hun persoonlijkheden te vertalen in een stalen profielportret.  
> Dit werk werd gemaakt met staal afkomstig van Arcelor Mittal.  
> Artikel ArcelorMittal  
> Hoogte 400 cm / diameter 400 cm  

Links: https://industry.arcelormittal.com/IndatenDivision?utm_source=mail&amp;utm_medium=socialseeder&amp;utm_campaign=International+Family+day

**Through your eyes** — oude URL `/portfolio/item3/` · vertalingen: en: Through your eyes, fr: Through your eyes, de: Through your eyes
> Het sculptuur werd in 2019 gemaakt en tentoongesteld op de RHS Show Hampton Court Palace in Londen.  
> Het kreeg heel wat aandacht van de media alsook een zilveren medaille. Je kan het kunstwerk er tot op heden nog steeds bezichtigen in het Wisley park in Londen.  
> Afmetingen: 3,10 meter hoog, 2,10 meter breed en 2,6 meter diep.  

Links: https://www.rhs.org.uk/gardens/wisley

**Tomorrowland fantasy flame pillars** — oude URL `/portfolio/item2/` · vertalingen: en: Tomorrowland fantasy flame pillar, fr: Tomorrowland fantasy flame pillar, de: Tomorrowland fantasy flame pillars
> In 2012 werd ik gevraagd door het festival Tomorrowland in Boom om een ontwerp te maken voor hun decor. Een groot werk dat te combineren viel met vuur, dat waren hun enige vereisten. Voor de rest had ik de ultieme creatieve vrijheid. Nadat ze het ontwerp zagen, hebben ze uiteindelijk beslist om 12 werken hiervan te bestellen. Deze vurige werken worden nu ieder jaar opnieuw gebruikt op het festival.  
> Afmetingen: 4 meter hoog en ongeveer 80 cm breed. De voet van zo’n pilaar weegt 250 kg (opgegoten met beton), iedere boog weegt ongeveer 200 kg.  

**Proud** — oude URL `/portfolio/item1/` · vertalingen: en: Proud, fr: Proud, de: Proud
> Dit kunstwerk werd oorspronkelijk gemaakt voor de triënnale tentoonstelling in Knokke-Heist. De organisatie benaderde mij met de vraag om een opvallende sculptuur te creëren die als blikvanger voor de stad zou dienen.  
> Om inspiratie op te doen, werkte ik met sleutelwoorden die de modieuze en kosmopolitische Belgische kust oproepen, zoals strand, zee, zon, welvaart en trots. Uit deze mix van sleutelwoorden is “Proud” ontstaan. Vandaag de dag kun je mijn werk niet alleen hier bewonderen, maar ook in Knokke-Heist.  
> Er bestaan verschillende versies van “Proud.” De grootste werd aangekocht door de stad Knokke-Heist en staat op de rotonde aan de A11 (Heistlaan). Dit stuk is 9 meter hoog, 1,4 meter breed en weegt 3,5 ton. Een kleinere versie is te vinden in het Park van Beervelde (Lochristi), met een hoogte van 3 meter, een breedte van 80 cm en een gewicht van 160 kg.  


## Bijlage B: alle pagina's van de oude site (4 talen)

| Taal | Pagina | URL | SEO-titel |
|---|---|---|---|
| de | Abstrakte Gartenskulpturen | `/de/abstrakte-gartenskulpturen/` | Abstrakte Gartenskulpturen | Williams Design |
| de | Cookie-Richtlinie | `/de/cookie-richtlinie/` | Cookie-Richtlinie - Williams Design |
| de | Cortenstahl-Gartenkunst | `/de/cortenstahl-gartenkunst/` | Gartenkunst aus Cortenstahl | Williams Design |
| de | Datenschutzerklärung | `/de/datenschutzerklaerung/` | Datenschutzerklärung - Williams Design |
| de | Große Gartenskulpturen | `/de/grosse-gartenskulpturen/` | Große Gartenskulpturen | Williams Design |
| de | Kontakt | `/de/kontakt/` | Kontakt - Williams Design |
| de | Startseite | `/de/startseite/` | Startseite - Williams Design |
| de | Veranstaltungen | `/de/veranstaltungen/` | Veranstaltungen - Williams Design |
| de | Über William | `/de/ueber-william/` | Über William - Williams Design |
| en | About William | `/en/about-william/` | About William - Williams Design |
| en | Abstract garden sculptures | `/en/abstract-garden-sculpture/` | Abstract Garden Sculptures | Williams Art & Design |
| en | Contact me | `/en/contact-me/` | Contact me - Williams Design |
| en | Cookie Policy | `/en/cookie-policy/` | Cookie Policy - Williams Design |
| en | Corten sculptures | `/en/corten-sculpture/` | Corten Sculptures | Williams Art and Design |
| en | Events | `/en/agenda/` | Events - Williams Design |
| en | Homepage | `/en/homepage/` | Homepage - Williams Design |
| en | Large garden statues | `/en/large-garden-statues/` | Custom Large Garden Statues | Williams Design |
| en | Privacy policy | `/en/privacy-policy/` | Privacy policy - Williams Design |
| fr | Contact | `/fr/contact/` | Contact - Williams Design |
| fr | Cookie Policy | `/fr/cookie-policy/` | Cookie Policy - Williams Design |
| fr | Homepage | `/fr/homepage/` | Homepage - Williams Design |
| fr | Politique de confidentialité | `/fr/privacy-policy/` | Politique de confidentialité - Williams Design |
| fr | Sculpture abstraite jardin | `/fr/sculpture-abstraite-jardin/` | Abstracte beelden voor je tuin | Williams Design |
| fr | Sculpture acier corten | `/fr/sculpture-acier-corten/` | Sculpture acier corten sur mesure | Williams Design |
| fr | Statue Exterieur XXL | `/fr/statue-exterieur-xxl/` | Statue exterieur xxl : sculptures monumentales pour jardin |
| fr | À propos de William | `/fr/a-propos-de-william/` | À propos de William - Williams Design |
| fr | Événements | `/fr/ordre-du-jour/` | Événements - Williams Design |
| nl | Abstracte beelden tuin | `/abstracte-beelden-tuin/` | Abstracte beelden voor je tuin | Williams Design |
| nl | Contact | `/contact/` | Contact - Williams Design |
| nl | Cookie Policy | `/cookie-policy/` | Cookie Policy - Williams Design |
| nl | Cortenstaal tuinkunst | `/cortenstaal-tuinkunst/` | Tuinkunst in cortenstaal | Williams Design |
| nl | Evenementen | `/agenda/` | Evenementen - Williams Design |
| nl | Grote tuinbeelden | `/grote-tuinbeelden/` | Grote tuinbeelden| Williams Design |
| nl | Homepage | `/` | Homepage - Williams Design |
| nl | Over William | `/over-william/` | Over William - Williams Design |
| nl | Privacy Policy | `/privacy-policy/` | Privacy Policy - Williams Design |

---

## 12. Status bouw (fase 3), 25/11/2026

**Lokaal draaien:** `node scripts/build.mjs` en dan `python3 -m http.server 4747 --bind 127.0.0.1 --directory dist`, open http://127.0.0.1:4747. Poort 4321 is bezet door een ander project.

**Structuur**
- `scripts/data.mjs` maakt `data/works.json` uit de crawl. **works.json is nu de bron**: werken aanvullen doe je daar.
- `scripts/build.mjs` bouwt `dist/`: alle pagina's, plus de feiten per werk (`SPECS`), de categorieteksten en de agenda.
- `scripts/images.sh` zet de foto's om naar webp (1800 en 900 px) in `assets/img/`. Video's staan in `assets/video/` (720p, verkleind van 327 MB).
- `assets/css/site.css` en `assets/js/site.js` (GSAP, ScrollTrigger, Lenis via CDN).
- `dist/_redirects` stuurt de oude werkadressen (`item1`, `item5-2`, …) door naar de nieuwe.

**Pagina's (NL):** home, /werk/, 34 × /portfolio/<slug>/, /cortenstaal-tuinkunst/, /abstracte-beelden-tuin/, /grote-tuinbeelden/, /opdrachten/, /over-william/, /agenda/, /contact/. Privacy en cookies zijn nog niet gebouwd.

**Signatuur**
- Een verticaal woordmerk in de linkerrail, een knipoog naar het oude logo, met een patinabalk die van staal naar roest kleurt terwijl je scrolt.
- "Index" als menu over het volle scherm, met een voorbeeldbeeld.
- Fotostroken die reageren op de scrollsnelheid.
- "Op ware grootte": een maatlat van 0 tot 10 m met een mens van 1,80 m.
- Het proces met een staalstaal dat roest.
- Een cursorbeeld bij de werklijst en de referenties.
- Een fiche plus aanvraagformulier per werk, en een atelierstrook om te slepen.
- Een nieuwsbrief-pop-up die alleen ontwerp is.

**Nog te doen**
- De finish-review en DESIGN.md van Impeccable.
- Privacy- en cookiepagina's.
- FR, EN en DE.
- Echte formulieren.
- Teksten voor de werken zonder tekst.
- Fotoselectie per werk nakijken. Sommige galerijen bevatten dubbele foto's of foto's van slechte kwaliteit.

## 13. Ronde 2 (feedback Jasper, 25/11/2026), nu met design-taste-frontend

**Feedback:**
- De rail links en de Index-overlay: weg.
- De navigatie moet zoals in de schets.
- "Op ware grootte" is goed.
- Het patinablokje was onduidelijk.
- "Waar het werk stond" voelde onaf.
- De footer moest beter.
- De werkpagina (lijst met zwevende foto) was "typisch AI".
- Opdrachten, Index en Agenda waren te veel van hetzelfde en te veel tekst.

**Aangepast:**
- **Header:** zoals de schets. Werk met een submenu, Agenda, Over William, Opdrachten, Contact en Instagram, rechts het woordmerk en de taalkiezer. Hij verbergt bij naar beneden scrollen en komt terug bij omhoog.
- **Home:**
  - Er is nog maar één fotostrook (één marquee per pagina).
  - Het proces heeft geen patinablokje meer, maar een stappenlijst links die oplicht per stap in beeld.
  - "Waar het werk stond" bestaat nu uit de Fujirebio-video, twee expofoto's en vier momenten: Venetië, Zürich, Londen en Knokke-Heist.
- **Werk:**
  - "Wand": uitgevulde rijen zoals in een galerie, met de echte verhouding van elke foto. Onder elk werk staan de titel, het materiaal, de afmeting en "Informeer".
  - "Op schaal": alle werken met gekende hoogte naast elkaar op één schaal, met een mens van 1,80 m en meterlijnen.
  - Filters per soort.
- **Opdrachten:**
  - tabbladen "Tuin en bedrijf" en "Events";
  - de werkwijze als horizontale rij met atelierfoto's;
  - "Gemaakt voor" als fotomozaïek.
- **Agenda:** jaren als tabbladen, korte regels per evenement, en een foto per jaar waar die er is.
- **Footer:** licht, met een Instagram-rij, contact, adres, menu, een nieuwsbriefveld en het grote woordmerk.
- **Overal:** koppen gestapeld (geen split-header), Phosphor-iconen, één contactlabel ("Neem contact op"), geen scroll-listeners op window.

**Bewust niet gedaan:** dark mode. De skill vraagt het, maar de site is een witte galerie, dus eerst afstemmen met Jasper.

## 14. Scope teruggebracht (25/11/2026)

Jasper: de homepage is goed. De andere pagina's waren nog niet aan de orde en zijn verwijderd uit de build: Werk, de werkpagina's, de categoriepagina's, Opdrachten, Over William, Agenda en Contact. `dist/` bevat nu enkel `index.html`. Links in het menu, de footer en de homepage naar die pagina's lopen voorlopig dood. De beslissingen uit §12 en §13 over die pagina's dienen enkel als idee voor later; ze zijn niet goedgekeurd.

## 15. Navigatie en links (25/11/2026)

- **Navigatie:** nu exact die van de schets (`info/williams-website.html`), met de lettertypes Jost en Tenor. Een hamburger links klapt de links horizontaal open (Werk, Agenda, Over William, Opdrachten, Contact, Instagram). Werk opent een submenu onder de header (Alle werken, Cortenstalen beelden, Abstracte tuinbeelden, Grote tuinbeelden). Rechts staan het kleine woordmerk (op de homepage pas zichtbaar na scrollen) en de taalkiezer met bolletje. Op mobiel opent het menu over het volledige scherm.
- **Links:** zolang enkel de homepage bestaat, zet de build alle interne links om naar `/`. Dat gebeurt in de functie `write` in `scripts/build.mjs`; die regel moet weg zodra er weer pagina's bijkomen.

## 16. Structuurschetsen in de site (25/11/2026)

De eerste MIDFI (losse map, kolommen, veel notities) vond Jasper te chaotisch, en die is verwijderd. Nu bouwt `scripts/build.mjs` voor elke pagina na de homepage een rustige structuurschets op de echte URL: /werk/, /portfolio/<werk>/ (34), de 3 categoriepagina's, /opdrachten/, /over-william/, /agenda/ en /contact/. Elke schets is één smalle kolom met grijze vlakken en weinig tekst, met de echte header en footer, een label "Structuurschets" en noindex. De CSS staat in `assets/css/midfi.css`. De homepage linkt er gewoon naartoe. Links naar pagina's die niet bestaan (privacy, cookies) gaan naar home. De nieuwsbrief-pop-up verschijnt alleen op de homepage.

## 17. Nieuwe structuur andere pagina's (25/11/2026)

Jasper vond de opbouw van de eerste structuurschetsen niet goed. Wat weg moest: lijsten van woorden met lijntjes ertussen. Kolommen mogen wel. Nieuwe opbouw, goedgekeurd en gepusht:
- **Werk:** de werken verspreid over de pagina.
- **Werkpagina:** groot beeld met de feiten ernaast, het verhaal, een vrije galerij, een atelierband en "Volgend werk".
- **Categorie:** titel naast een sfeerbeeld, de werken verspreid, de SEO-tekst ingeklapt.
- **Opdrachten:** breed beeld, drie voorbeelden (stad, festival, bedrijf), drie stappen.
- **Over William:** video, één grote zin, drie momenten.
- **Agenda:** "Binnenkort", het jaar groot met een alinea en een foto, oudere jaren als cijfers.
- **Contact:** gegevens naast het formulier.
