# Digitala Mognadsresan

Ett svenskt webbläsarspel som gör en digital mognadsanalys till sex uppdrag. Spelet innehåller samtliga 11 frågeomgångar och 86 bedömningsdelar från det tillhandahållna svenska DMA-underlaget.

**Spela:** https://ponddigger.github.io/digital-maturity-quest/

## Spelupplevelsen

- Sex uppdrag: strategi, teknik, människor, data, AI/automatisering och hållbarhet.
- 100 XP per bekräftad omgång och 50 XP per slutfört uppdrag. Alla ärliga svar ger samma XP.
- Sex samlarbara märken och en digital kompass som växer fram.
- Valfri ordning, möjlighet att återvända och ändra svar samt valfri lokal lagring.
- Spindeldiagram, skriven bedömning per område och ett förslag för nästa 90 dagar.
- Direkt nedladdning av en fullständig PDF med vektordiagram, bedömning, handlingsförslag, samtliga 86 svar och kontaktuppgifter.
- Fiktiv exempelrapport som aldrig ändrar spelarens egna svar.
- Anpassning för mobil, tangentbordsstöd och reducerad rörelse.

## Öppna lokalt

Öppna `dist/index.html` direkt i en modern webbläsare. PDF-biblioteket är inkluderat lokalt. Inga beroenden behöver installeras. Lokal lagring kan vara begränsad när sidan öppnas direkt från en fil.

För lokal webbserver, kör från denna mapp:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Öppna sedan `http://127.0.0.1:4173/`.

## Integritet

Spelet frågar inte efter företagsnamn, personnamn, e-post eller andra identitetsuppgifter. Svar behandlas i webbläsaren. Det finns ingen backend, ingen extern AI, inga analysverktyg och inga externa typsnitt eller bildanrop. En Content Security Policy blockerar nätverksanrop från spelet. GitHub kan behandla vanliga besöksuppgifter vid sidladdning.

Som standard finns svar bara i flikens minne och försvinner vid omladdning eller stängning. Spelaren kan uttryckligen välja att spara bekräftade svar på enheten. Funktionen **Radera svar och börja om** tar bort spelets lagrade svar. Undvik lokal lagring på delade datorer. Nedladdade rapporter hanteras av spelaren och raderas inte av spelet.

Den offentliga koden innehåller inga originaldokument, inga verkliga företagssvar och inga uppgifter från det konfidentiella exempelresultatet. Exempeldata är konstruerade i `demoAnswers()`.

## Kostnadsfritt DMA-samtal

I slutet av spelet och på rapportens sista sida finns en inbjudan att kontakta Jörg Teichgraeber, projektledare för [DigIT Hub Sweden](https://digithub.se/) hos Techtank i Olofström. Kontakt sker via e-post eller telefon på spelarens initiativ. Spelet skickar eller bifogar aldrig rapporter eller svar automatiskt. Ingen serverlagring eller rapportinsamling finns.

## Poängmodell

Det tillhandahållna frågeunderlaget saknar en officiell poängnyckel. Spelet använder därför en egen, transparent modell. **Det är inte ett officiellt EU DMAT-resultat, en certifiering, en branschjämförelse eller en säkerhetsrevision.**

| Område | Frågeomgångar |
| --- | --- |
| Strategi & riktning | 1–2 |
| Teknik & verktyg | 3–4 |
| Människor & kompetens | 5–6 |
| Data & trygghet | 7–8 |
| AI & automatisering | 9 |
| Hållbar digitalisering | 10–11 |

- **Fråga 1:** Andel av tio affärsområden med genomförd investering × 100. Planerad investering ger inga nulägespoäng. Både genomförd och planerad investering kan anges.
- **Flerval:** Andelen markerade positiva alternativ × 100. Ett uttryckligt ”Inget av alternativen” ger 0.
- **Fråga 7:** ”Uppgifter samlas inte in digitalt” ger 0 och utesluter de digitala arbetssätten. En datahanteringspolicy kan ändå väljas. Annars används antalet valda positiva alternativ delat med sju.
- **Skala 0–5:** Summan delat med antal rader × 5, multiplicerat med 100.
- **Nej/Delvis/Ja:** 0/50/100, medelvärde över fem rader.
- **Områden:** Lika vikt för frågeomgångarna inom området.
- **Total:** Lika vikt för de sex områdena, beräknat före avrundning.

Nivåerna är spelets egna: På upptäcktsfärd (0–<25), Bygger grunden (25–<50), Utvecklar förmågan (50–<75), Driver utvecklingen (75–100). Avrundade heltal visas i diagrammet; nivåer använder oavrundat värde.

Alla uppräknade tekniker är inte relevanta för alla företag. Modellen mäter bredd av självrapporterade arbetssätt och teknikstatus, inte bevisad affärsnytta. Resultatet bör diskuteras tillsammans med verksamhetens förutsättningar. XP och märken påverkar inte mognadspoängen.

Skriftlig återkoppling bygger på fasta lokala regler och nivåanpassade texter. Tre områden med låga poäng föreslås för nästa steg; dataområdet placeras först om säkerhetskopiering eller kontinuitetsplan saknas bland svaren. Texten genereras utan att skicka svar till en AI-tjänst.

## Frågetrogenhet

Alla bedömningsdelar har behållits med källans svenska formuleringar. Det ursprungliga investeringsrutnätets två krysskolumner representeras av fyra möjliga kombinationer. Skalor 0–5 och Nej/Delvis/Ja behålls. En förklarande rad vid underlagets ”Tillverkning av tillbehör” tydliggör att 3D-exemplet avser additiv tillverkning. Introduktioner, spelspråk och rapporttexter är skrivna för spelet.

## Utveckling och publicering

Allt som behövs i webbläsaren finns i `dist/`:

- `index.html`: sidram, metadata och säkerhetspolicy
- `styles.css` och `brand.css`: layout, Techtanks design, mobil och utskrift
- `questions.js`: frågebank och områden
- `engine.js`: validering, poäng och fiktiva exempel
- `contact.js`: uttryckligen publicerade kontaktuppgifter
- `report-model.js`: gemensam bedömning för skärm och PDF
- `pdf-export.js`: lokal PDF-generering
- `pdf-assets.js` och `assets/`: lokala typsnitt och Techtanks logotyp
- `vendor/`: pdf-lib 1.17.1, @pdf-lib/fontkit 1.1.1 och licensinformation
- `icons.js`: lokala Lucide-ikoner (ISC-licens)
- `app.js`: spel, rapport, lokal lagring och valfria WebMCP-verktyg

Kör kontroller med Node.js 20 eller senare:

```sh
node --test tests/*.test.cjs
node --check dist/app.js
```

GitHub Actions publicerar endast `dist/` till GitHub Pages vid push till `main`. Aktivera Pages med **GitHub Actions** som källa i repository-inställningarna om du använder en egen kopia. Inga betalda tjänster eller hemliga nycklar krävs.

WebMCP är valfritt och aktiveras bara i webbläsare som stöder `document.modelContext`. Verktygen läser framsteg, öppnar en frågeomgång och bekräftar ett val via samma validering och tillstånd som gränssnittet.
