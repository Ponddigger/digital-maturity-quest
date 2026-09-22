/* Swedish question wording from the supplied DMA EU questionnaire. No company data. */
const DMA_DATA = {
  "version": 1,
  "sectors": [
    {
      "id": "strategy",
      "name": "Strategi & riktning",
      "label": "Digital affärsstrategi",
      "short": "Strategi",
      "icon": "compass",
      "color": "#054169",
      "description": "Sätt kursen för er digitala resa.",
      "questions": [
        "q1",
        "q2"
      ],
      "badge": "Vägvisaren"
    },
    {
      "id": "technology",
      "name": "Teknik & verktyg",
      "label": "Digital beredskap",
      "short": "Teknik",
      "icon": "cpu",
      "color": "#054169",
      "description": "Utforska er digitala verktygslåda.",
      "questions": [
        "q3",
        "q4"
      ],
      "badge": "Teknikutforskaren"
    },
    {
      "id": "people",
      "name": "Människor & kompetens",
      "label": "Människocentrerad digitalisering",
      "short": "Människor",
      "icon": "users",
      "color": "#054169",
      "description": "Ge människorna plats i förändringen.",
      "questions": [
        "q5",
        "q6"
      ],
      "badge": "Lagbyggaren"
    },
    {
      "id": "data",
      "name": "Data & trygghet",
      "label": "Datahantering",
      "short": "Data",
      "icon": "shield-check",
      "color": "#054169",
      "description": "Gör era data användbara och säkra.",
      "questions": [
        "q7",
        "q8"
      ],
      "badge": "Dataväktaren"
    },
    {
      "id": "automation",
      "name": "AI & automatisering",
      "label": "Automatisering och intelligens",
      "short": "AI & automation",
      "icon": "workflow",
      "color": "#054169",
      "description": "Hitta teknik som avlastar och hjälper.",
      "questions": [
        "q9"
      ],
      "badge": "Möjliggöraren"
    },
    {
      "id": "green",
      "name": "Hållbar digitalisering",
      "label": "Grön digitalisering",
      "short": "Hållbarhet",
      "icon": "leaf",
      "color": "#054169",
      "description": "Koppla digitala val till hållbar nytta.",
      "questions": [
        "q10",
        "q11"
      ],
      "badge": "Framtidsbyggaren"
    }
  ],
  "questions": [
    {
      "id": "q1",
      "number": 1,
      "title": "DIGITALISERING AV AFFÄRSOMRÅDEN",
      "prompt": "På vilka av följande affärsområden har företaget redan investerat i digitalisering, och på vilka planerar ni att göra det i framtiden?",
      "type": "investment",
      "items": [
        "Utformning av produkter/tjänster (inkl. forskning, utveckling och innovation)",
        "Projektplanering och projektledning",
        "Drift (produktion av fysiska varor/tillverkning, förpackning, underhåll, tjänster osv.)",
        "Samarbete med andra interna enheter eller andra företag i samma värdekedja",
        "Ingående logistik och lagring",
        "Marknadsföring, försäljning och kundservice (kundkontakter, orderbehandling, hjälpcentral osv.)",
        "Leverans (utgående logistik, e-fakturor osv.)",
        "Administration och personalförvaltning (HR)",
        "Inköp och upphandling",
        "(Cyber)säkerhet och efterlevnad av regelverk om personuppgifter och dataskyddsförordningen"
      ],
      "labels": [
        "Varken investerat eller planerat",
        "Redan investerat",
        "Planerar att investera",
        "Både investerat och planerar mer"
      ]
    },
    {
      "id": "q2",
      "number": 2,
      "title": "DIGITAL BEREDSKAP",
      "prompt": "På vilka av följande sätt är företaget förberett på (ytterligare) digitalisering?",
      "type": "multi",
      "items": [
        "Digitaliseringsbehov är fastställda och anpassade till affärsmålen",
        "Ekonomiska resurser (eget kapital, lån, subventioner) finns avsatta för att säkerställa digitalisering under minst ett år",
        "IT-infrastruktur finns redo till stöd för digitaliseringsplanerna",
        "IKT-specialister har anställts/anlitats som underleverantörer (alternativt har behov av anställningar/underleverantörer fastställts)",
        "Företagets ledning är redo att leda de förändringar som behövs i organisationen",
        "Berörda företagsavdelningar och deras personal är redo att stödja digitaliseringsplanerna",
        "Företagsarkitektur och verksamhetsprocesser kan anpassas om digitaliseringen så kräver",
        "De tillverkade produkterna är redan kommersialiserade som en tjänst (så kallad tjänstefiering) eller kompletterade med tjänster som drivs av digital teknik",
        "Det följs regelbundet upp att kunder och partner är nöjda med tjänster/interaktioner online (på kanaler i sociala medier, e-handelsverksamhet, e-postväxling osv.)",
        "Hänsyn tas till riskerna med digitaliseringen (t.ex. oplanerade effekter på andra affärsområden)"
      ]
    },
    {
      "id": "q3",
      "number": 3,
      "title": "DIGITAL TEKNIK OCH LÖSNINGAR",
      "prompt": "Vilka av följande digitala tekniktyper och lösningar används redan i företaget?",
      "type": "multi",
      "items": [
        "Konnektivitetsinfrastruktur (höghastighetsinternet (fiber), molntjänster, fjärråtkomst till kontorssystem)",
        "Webbplats för företaget",
        "Webbaserade formulär och bloggar eller forum för kundkommunikation",
        "Livechattar, sociala nätverk och chattbottar för kundkommunikation",
        "E-handelsförsäljning (Business-to-Consumer, Business-to-Business)",
        "E-marknadsföringserbjudanden (onlineannonser, sociala medier för affärsverksamheten osv.)",
        "E-förvaltning (onlineinteraktion med offentliga myndigheter, däribland för offentlig upphandling)",
        "Verktyg för samarbeten på distans i företaget (t.ex. platform för distansarbete, videokonferenser, virtuella studier, företagsspecifikt)",
        "Intern webbportal (intranät)",
        "Informationshanteringssystem (företagsresursplanering, produktlivscykelhantering, kundrelationshantering, leveranskedjehantering, e-fakturering)"
      ]
    },
    {
      "id": "q4",
      "number": 4,
      "title": "AVANCERAD DIGITAL TEKNIK",
      "prompt": "Vilka av följande avancerade digitala tekniktyper används redan i ditt företag?",
      "type": "scale",
      "items": [
        "Simulering och digitala tvillingar (digital återgivning i realtid av fysiska objekt/processer)",
        "Virtuell verklighet (VR), förstärkt verklighet (AR)",
        "Datorstödd konstruktion (CAD) och tillverkning (CAM)",
        "Manufacturing Execution System",
        "Sakernas internet (IoT) och sakernas internet inom industrin (I-IoT)",
        "Blockkedjeteknik",
        "Tillverkning av tillbehör (t.ex. 3D-skrivare)"
      ],
      "labels": [
        "0 · Används inte",
        "1 · Överväger att använda",
        "2 · På prototypstadiet",
        "3 · På teststadiet",
        "4 · Håller på att införa",
        "5 · I drift"
      ]
    },
    {
      "id": "q5",
      "number": 5,
      "title": "PERSONALENS KOMPETENS OCH UTBILDNING",
      "prompt": "Vad gör företaget i fråga om omskolning och fortbildning av personalen inom digitalisering?",
      "type": "multi",
      "items": [
        "Utför bedömningar av personalens kompetens för att fastställa kompetensklyftorna",
        "Utformar en plan för utbildning och fortbildning av personalen",
        "Ordnar korta utbildningar samt tillhandahåller handledningar/riktlinjer och andra e-läranderesurser",
        "Underlättar möjligheter till inlärning i arbetet/peer learning/experimenterande",
        "Erbjuder praktikplatser och arbetsförmedling på viktiga kapacitetsområden",
        "Sponsrar personalens deltagande i utbildningar anordnade av externa organisationer (utbildningsanordnare, den akademiska världen, leverantörer)",
        "Använder subventionerade utbildnings- och fortbildningsprogram"
      ]
    },
    {
      "id": "q6",
      "number": 6,
      "title": "PERSONALENS ENGAGEMANG VID DIGITALISERING",
      "prompt": "Hur engagerar företaget personalen när nya digitala lösningar introduceras?",
      "type": "multi",
      "items": [
        "Informerar personalen om ny digital teknik",
        "Förmedlar digitaliseringsplanerna till personalen på ett öppet och inkluderande sätt",
        "Följer upp personalens acceptans och vidtar åtgärder mot eventuella sidoeffekter (t.ex. rädsla för förändringar, \"alltid tillgänglig\"-kultur kontra balans mellan arbete och privatliv, skyddsåtgärder mot risker för integritetsbrott etc.)",
        "Involverar personalen (inklusive annan än IKT-personal) i att utforma och utveckla digitaliseringen av produkter/tjänster/processer",
        "Ger personalen mer självständighet och lämpliga digitala verktyg för att ta beslut och verkställa dem",
        "Omarbetar/anpassar jobb och arbetsflöden så det passar med hur personalen faktiskt skulle vilja arbeta",
        "Inrättar mer flexibla arbetsordningar med digitalisering som grund (t.ex. distansarbete)",
        "Ställer ett team/en tjänst för digital support (internt/externt) till personalens förfogande"
      ]
    },
    {
      "id": "q7",
      "number": 7,
      "title": "DATAHANTERING",
      "prompt": "Hur hanteras uppgifter i företaget (lagring, ordning, hämtning och utnyttjande)?",
      "type": "multi",
      "items": [
        "Organisationen har en policy/plan/uppsättning åtgärder för datahantering",
        "Uppgifter samlas inte in digitalt",
        "Relevanta uppgifter lagras digitalt (t.ex. kontorsprogram, e-postmappar, fristående applikationer, CRM- eller ERP-system osv.)",
        "Uppgifter integreras ordentligt (t.ex. genom interoperativa system och applikationsprogrammeringsgränssnitt) även när de distribueras mellan olika system",
        "Uppgifter är tillgängliga i realtid från olika enheter och platser",
        "Insamlade uppgifter analyseras systematiskt och rapporteras för beslutsfattande",
        "Dataanalyser berikas genom att externa källor kombineras med egna uppgifter",
        "Dataanalyser är tillgängliga utan att det behövs experthjälp (t.ex. genom instrumentpaneler)"
      ],
      "exclusive": 1
    },
    {
      "id": "q8",
      "number": 8,
      "title": "CYBERSÄKERHET",
      "prompt": "Är företagets uppgifter tillräckligt säkrade?",
      "type": "multi",
      "items": [
        "En företagspolicy eller uppsättning av åtgärder för datasäkerhet finns på plats",
        "Alla klientrelaterade uppgifter är skyddade mot cyberangrepp",
        "Personalen informeras och utbildas regelbundet om cybersäkerhet och problem/risker i samband med dataskydd",
        "Cyberhot följs upp och bedöms regelbundet",
        "Det finns en fullständig säkerhetskopia av centrala företagsuppgifter (utanför arbetsplatsen/i molnet)",
        "Det finns en affärskontinuitetsplan vid katastrofala incidenter (t.ex. att alla uppgifter låses i en ransomware-attack eller fysisk skada på IT-infrastrukturen)"
      ]
    },
    {
      "id": "q9",
      "number": 9,
      "title": "AUTOMATISERING OCH INTELLIGENS",
      "prompt": "Vilka av följande tekniktyper och affärsapplikationer använder redan ditt företag?",
      "type": "scale",
      "items": [
        "Bearbetning av naturligt språk (chattbottar, textutvinning, maskinöversättning, attitydanalys)",
        "Datorseende/bildigenkänning",
        "Ljudbehandling/taligenkänning, talbehandling och talsyntes",
        "Robotik och autonoma enheter",
        "Omvärldsbevakning, dataanalys, beslutsfrämjande system, rekommendationssystem, intelligenta styrsystem"
      ],
      "labels": [
        "0 · Används inte",
        "1 · Överväger att använda",
        "2 · På prototypstadiet",
        "3 · På teststadiet",
        "4 · Håller på att införa",
        "5 · I drift"
      ]
    },
    {
      "id": "q10",
      "number": 10,
      "title": "DIGITAL TEKNIK FÖR MILJÖMÄSSIG HÅLLBARHET",
      "prompt": "Hur använder företaget digital teknik för att bidra till miljömässig hållbarhet?",
      "type": "multi",
      "items": [
        "Hållbar affärsmodell (t.ex. cirkulär ekonomisk modell, produkt som tjänst)",
        "Tillhandahållande av hållbara tjänster (t.ex. spårning av användning för vidare återanvändning av andra användare)",
        "Hållbara produkter (t.ex. ekodesign, heltäckande livscykelplanering för produkter, hantering vid uttjänthet och förlängning av livslängden)",
        "Hållbara produktions- och tillverkningsmetoder, material och komponenter (inkl. hantering vid uttjänthet)",
        "Hantering av utsläpp, föroreningar och/eller avfall",
        "Hållbar energiproduktion på egen anläggning",
        "Optimering av råvaruförbrukning och råvarukostnader",
        "Minskning av transport- och förpackningskostnader",
        "Digitala applikationer för att uppmuntra kunderna till ansvarsfullt beteende",
        "Papperslösa administrativa processer"
      ]
    },
    {
      "id": "q11",
      "number": 11,
      "title": "MILJÖASPEKTER I DIGITALA STRATEGIER",
      "prompt": "Tar företaget hänsyn till miljöpåverkan i sina digitala val och metoder?",
      "type": "scale",
      "items": [
        "Miljöhänsyn och miljöstandarder ingår i företagets affärsmodell och strategi",
        "Ett miljöledningssystem eller certifiering har införts",
        "Miljöaspekter ingår i kriterierna för upphandling av teknik/leverantörer",
        "Den digitala teknikens och datalagringens energiförbrukning övervakas och optimeras",
        "Återvinning/återanvändning av gammal teknisk utrustning utövas aktivt av företaget"
      ],
      "labels": [
        "Nej",
        "Delvis",
        "Ja"
      ]
    }
  ]
};
if(typeof module!=="undefined") module.exports=DMA_DATA;
