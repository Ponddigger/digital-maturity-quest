# Verifiering

- Alla 11 grupper och 86 bedömningsdelar finns i frågebanken och är kopplade till ett område.
- 21 automatiska kontroller täcker minimum/maximum, planerade investeringar, motstridiga datasvar, ofullständiga och skadade svar, stabil XP, områdesviktning, oberoende exempeldata, fullständig svarsbilaga, PDF-export med avsedda kontaktlänkar samt CSV-format och svarskodning.
- Hela flödet från start till rapport har genomförts i webbläsare med konstruerade testsvar.
- Tomma obligatoriska rader stoppas. Flerval kräver minst ett val eller ett uttryckligt ”Inget”.
- Alla sex märken och 1 400 XP nås vid fullständigt genomförande.
- Mobilvy har granskats vid 390 pixlars bredd. Diagrametiketter förstoras på mindre skärmar.
- Valfri lokal lagring har verifierats genom omladdning.
- Direkt PDF-hämtning och skriven återkoppling har kontrollerats i gränssnittet.
- PDF-exemplet har 19 A4-sidor med vektordiagram, bedömning, 90-dagarsförslag, metod, alla 86 bedömningsdelar och svar samt kontaktuppgifter. Sidornas layout har granskats visuellt.
- Namnet DigIT Hub Sweden länkar till https://digithub.se/ i spelet och PDF-rapporten. Även logotypen är klickbar i sidhuvudet, under ”Ert nästa steg” och på PDF:ens första och sista sida; PDF-länkarna kontrolleras i rapporttestet.
- Layouten använder Techtanks lokala logotyp, Open Sans och Open Sans Condensed samt profilfärger.
- WebMCP-verktygens registrering, giltiga svar, avvisning av ogiltiga svar och återläsning av tillstånd har verifierats i en webbläsare som stöder dem.
- Källmaterial och konfidentiella företagsdata ingår inte i publiceringspaketet.

## Kontroller för uppdateringen 2026-09-24

- Alla 21 tester går igenom, inklusive åtta CSV-tester: UTF-8-BOM, exakt kolumnordning, 86 datarader, citattecken/semikolon/radbrytningar, flerval, investeringar/skalor, tomma svarsfält, exempelmarkering och inga extra identitetsfält.
- En separat kontroll med Pythons CSV-läsare bekräftar 86 rader, 13 kolumner och bevarade svenska tecken i den genererade exempelfilen.
- CSV-knappen och dess förklaring har granskats i webbläsarens rapportvy. Knappen visar lyckad lokal filgenerering utan konsolfel. Testwebbläsaren gav ingen verifierbar nedladdningshändelse; filinnehållet verifierades separat med samma exportmodul.
- DigIT Hub- och EU-märkningen har granskats visuellt i sidhuvudet på dator och vid 390 px bredd. Bilden laddas i sin helhet och mobilens start- och rapportvy har ingen horisontell överströmning. Märkningen finns även i frågevyn.
- Finansieringsmeningen i startvyn och ”Metod & integritet”, projektsidans länkar och finansieringsraden i sidfoten har kontrollerats i webbläsaren.
- PDF-exemplet har fortfarande 19 sidor. Den ändrade försättssidan har renderats och granskats visuellt: diagram, områdesvärden, finansieringsbild och sidfot är läsbara och separerade. Den befintliga finansieringsbilden på kontaktsidan är kvar.
- CSP:n är identisk med föregående version, inklusive `connect-src 'none'`. Frågebank, poängmotor och rapportmodell har inga ändringar. CSV-exporten använder en lokal Blob utan nätverksanrop.
- Excel-anpassad kodning och avgränsning är verifierad. Visuell kontroll i Microsoft Excel kunde inte genomföras eftersom behörighet för appstyrning saknas.

Detta är funktionell verifiering av spelet. Det är ingen validering mot EU:s officiella poängalgoritm och ingen formell tillgänglighetscertifiering.
