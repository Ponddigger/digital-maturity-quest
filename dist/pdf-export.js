/* Creates a genuine, self-contained PDF locally. No network or server rendering. */
(function(root){
'use strict';
const PDF=typeof PDFLib!=='undefined'?PDFLib:require('./vendor/pdf-lib.min.js');
const assets=typeof DMAPdfAssets!=='undefined'?DMAPdfAssets:require('./pdf-assets.js');
const fonts=typeof fontkit!=='undefined'?fontkit:require('./vendor/fontkit.umd.min.js');
const decode=value=>Uint8Array.from(atob(value),c=>c.charCodeAt(0));
async function generate(model){
 const {PDFDocument,StandardFonts,rgb,PDFString}=PDF;
 const doc=await PDFDocument.create();
 doc.setTitle(model.demo?'Digital mognadsprofil - fiktivt exempel':'Digital mognadsprofil');
 doc.setAuthor('Digitala Mognadsresan');doc.setCreator('Digitala Mognadsresan');doc.setSubject('Självskattning med egen poängmodell');doc.setLanguage('sv-SE');
 doc.registerFontkit(fonts);
 const regular=await doc.embedFont(decode(assets.regular),{subset:true}),bold=await doc.embedFont(decode(assets.bold),{subset:true}),display=await doc.embedFont(decode(assets.display),{subset:true});
 const logo=await doc.embedPng(decode(assets.logo)),fundingLogos=await doc.embedPng(decode(assets.fundingLogos));
 const W=595.28,H=841.89,M=48,CW=W-2*M;
 const color=hex=>{const n=parseInt(hex.replace('#',''),16);return rgb((n>>16)/255,((n>>8)&255)/255,(n&255)/255);};
 const ink=color('#054169'),muted=color('#46545F'),lineColor=color('#C9D3DB'),accent=color('#FAD773'),green=color('#054169'),paper=color('#EFF6FB');
 const safe=t=>String(t).replace(/[\u2010-\u2015]/g,'-').replace(/\u202f|\u00a0/g,' ').replace(/↗|→/g,'>').replace(/✓/g,'');
 let page;
 function uriLink(url,x,y,width,height){
  const annotation=doc.context.obj({Type:'Annot',Subtype:'Link',Rect:[x,H-y-height,x+width,H-y],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:PDFString.of(url)}});
  page.node.addAnnot(doc.context.register(annotation));
 }
 const text=(t,x,y,size=11,font=regular,c=ink)=>{if(font===bold&&size>=16){font=display;t=String(t).toUpperCase();}page.drawText(safe(t),{x,y:H-y-size,size,font,color:c});};
 const rect=(x,y,w,h,c,bc)=>page.drawRectangle({x,y:H-y-h,width:w,height:h,color:c,...bc?{borderColor:bc,borderWidth:.6}:{}});
 const rule=(x1,y1,x2,y2,c=lineColor,width=.7)=>page.drawLine({start:{x:x1,y:H-y1},end:{x:x2,y:H-y2},color:c,thickness:width});
 function para(t,x,y,width=CW,size=11,font=regular,c=muted,leading=17){
  if(font===bold&&size>=16){font=display;t=String(t).toUpperCase();}
  const words=safe(t).split(/\s+/);let current='',lines=[];
  for(const word of words){const candidate=current?current+' '+word:word;if(font.widthOfTextAtSize(candidate,size)>width&&current){lines.push(current);current=word;}else current=candidate;}
  if(current)lines.push(current);
  for(const l of lines){text(l,x,y,size,font,c);y+=leading;}return y;
 }
 function newPage(kicker,title,subtitle){page=doc.addPage([W,H]);rect(0,0,W,12,ink);text('DIGITALA MOGNADSRESAN',M,31,9,bold,muted);text(model.date,M,48,8,regular,muted);page.drawImage(logo,{x:W-M-145,y:H-24-145*logo.height/logo.width,width:145,height:145*logo.height/logo.width});uriLink('https://www.techtank.se/',W-M-145,24,145,145*logo.height/logo.width);text(kicker.toUpperCase(),M,76,9,bold,green);para(title,M,97,CW,27,bold,ink,32);if(subtitle)para(subtitle,M,144,CW,10,regular,muted,15);}
 function radar(cx,cy,r,values){
  const pt=(i,v)=>{const a=(-90+i*60)*Math.PI/180;return [cx+Math.cos(a)*r*v/100,cy+Math.sin(a)*r*v/100];};
  for(const v of [25,50,75,100])for(let i=0;i<6;i++){const a=pt(i,v),b=pt((i+1)%6,v);rule(...a,...b,lineColor,.7);}
  for(let i=0;i<6;i++){const p=pt(i,100);rule(cx,cy,...p,lineColor,.7);}
  const poly=values.map((v,i)=>pt(i,v));const path=poly.map(([x,y],i)=>(i?'L':'M')+x+' '+y).join(' ')+' Z';
  page.drawSvgPath(path,{x:0,y:H,color:color('#4698CA'),opacity:.22,borderColor:green,borderWidth:1.8,borderOpacity:1});
  for(const [x,y] of poly)page.drawCircle({x,y:H-y,size:3,color:green});
  const labels=['Strategi','Teknik','Människor','Data','AI','Hållbarhet'];
  for(let i=0;i<6;i++){
   const [x,y]=pt(i,145);const label=labels[i],v=Math.round(values[i])+' %';
   text(label,x-regular.widthOfTextAtSize(label,10)/2,y-10,10,regular,ink);
   text(v,x-bold.widthOfTextAtSize(v,10)/2,y+5,10,bold,green);
  }
  for(const v of [25,50,75,100])text(v,cx+5,cy-r*v/100-10,7,regular,muted);
 }
 newPage('Er digitala mognadsprofil','Från nuläge till nästa steg.',model.demo?'FIKTIVT EXEMPEL - helt konstruerade svar.':'Vägledande självskattning. Ingen företagsidentitet har efterfrågats.');
 text(Math.round(model.scores.overall),M,198,68,bold,green);text('/ 100',M+128,247,15,regular,muted);
 para(model.level,M,284,220,19,bold,ink,23);para('Samlad poäng i spelets modell',M,321,190,10,regular,muted,14);
 radar(397,290,79,model.scores.sectors.map(s=>s.score));
 let y=419;for(const s of model.scores.sectors){text(s.name,M,y,11,regular,ink);text(Math.round(s.score)+' %',W-M-38,y,11,bold,green);rect(M,y+20,CW,4,lineColor);rect(M,y+20,CW*s.score/100,4,green);y+=30;}
 para('Ett samtalsunderlag om era arbetssätt och teknikval. Detta är spelets egen modell, inte ett officiellt EU DMAT-resultat eller en certifiering.',M,600,CW,10,regular,muted,14);
 const coverFundingWidth=280,coverFundingHeight=coverFundingWidth*fundingLogos.height/fundingLogos.width;
 page.drawImage(fundingLogos,{x:(W-coverFundingWidth)/2,y:H-630-coverFundingHeight,width:coverFundingWidth,height:coverFundingHeight});
 uriLink(model.contact.projectUrl,(W-coverFundingWidth)/2,630,coverFundingWidth,coverFundingHeight);
 newPage('Överblick','Er samlade bedömning.','Sex perspektiv som hjälper er att välja nästa utvecklingsinsats.');
 let yy=201;yy=para(model.summary,M,yy,CW,14,regular,ink,22)+26;
 text('Styrkor och utvecklingsutrymme',M,yy,16,bold);yy+=35;
 yy=para('Använd profilen för att diskutera vad som redan fungerar, vilka förutsättningar som saknas och vilka förändringar som ger störst nytta i just er verksamhet.',M,yy,CW,11,regular,muted,18)+22;
 if(model.securityGap){rect(M,yy,CW,112,paper);text('Prioritera kontinuitet',M+18,yy+16,13,bold);para('Säkerhetskopiering eller kontinuitetsplan saknas bland era val. Kontrollera detta tidigt, även om den samlade poängen är hög. En självskattning visar inte om säkerhetsåtgärder fungerar i praktiken.',M+18,yy+42,CW-36,11,regular,muted,17);yy+=140;}
 text('Tre frågor att ta med till teamet',M,yy,16,bold);yy+=36;
 for(const [i,t] of ['Vilka svar behöver vi kontrollera eller nyansera tillsammans?','Vilket affärsproblem är viktigast att förbättra de närmaste tre månaderna?','Vem tar ansvar, vilka resurser behövs och hur följer vi upp nyttan?'].entries()){text('0'+(i+1),M,yy,11,bold,green);yy=para(t,M+35,yy,CW-35,12,regular,ink,19)+24;}
 para('Teknikbredd är inte samma sak som affärsnytta. Alla tekniker i underlaget passar inte alla företag. Använd verksamhetens behov och risker för att prioritera.',M,710,CW,10,regular,muted,15);
 for(let pair=0;pair<3;pair++){
  newPage('Områdesbedömning '+(pair+1)+' av 3','Det här berättar era svar.','Nulägesbild och ett konkret nästa steg för varje område.');
  for(let k=0;k<2;k++){
   const s=model.insights[pair*2+k],top=201+k*279;
   text('0'+(pair*2+k+1),M,top,10,bold,green);text(Math.round(s.score)+' / 100',W-M-63,top,12,bold,green);
   text(s.name,M,top+25,20,bold);text(s.level,M,top+54,10,regular,muted);
   const end=para(s.summary,M,top+82,CW,11,regular,muted,17);
   const boxY=Math.max(top+153,end+12);rect(M,boxY,CW,86,paper);text('NÄSTA STEG',M+16,boxY+12,9,bold,green);para(s.action,M+16,boxY+32,CW-32,11,regular,ink,17);
  }
 }
 newPage('Från insikt till handling','Era kommande 90 dagar.','Ett förslag att anpassa efter affärsbehov, risk, tid och resurser.');
 for(let i=0;i<3;i++){
  const s=model.priorities[i],top=197+i*169;
  rect(M,top,4,144,green);text(['DAG 1-30 / FÖRSTÅ','DAG 31-60 / PRÖVA','DAG 61-90 / FÖLJ UPP'][i],M+19,top,9,bold,green);
  text(s.name,M+19,top+24,17,bold);let end=para(s.action,M+19,top+53,CW-19,11,regular,ink,17);
  para(['Utse en ansvarig och beskriv hur ni ser att det blir bättre.','Gör ett avgränsat försök och dokumentera vad ni lär er.','Jämför med nuläget. Besluta om ni ska justera, skala upp eller avsluta.'][i],M+19,end+9,CW-19,10,regular,muted,15);
 }
 para('Börja hellre med en genomförbar förbättring än med flera parallella teknikprojekt. Bestäm en tidpunkt då ni gör om bedömningen och jämför utvecklingen.',M,728,CW,10,regular,muted,15);
 newPage('Transparens','Metod och avgränsningar.','Så hänger underlaget, poängen och bedömningen ihop.');
 let my=195;
 const sections=[
 ['Underlag','11 frågeomgångar och 86 bedömningsdelar från det tillhandahållna svenska DMA-underlaget. Frågorna grupperas i sex områden. Inga verkliga exempelresultat har använts som speldata.'],
 ['Beräkning','Flerval ger andelen positiva markerade alternativ. Genomförda investeringar räknas; enbart planerade investeringar ger 0. Skalor 0-5 räknas om till 0-100. Nej/Delvis/Ja motsvarar 0/50/100.'],
 ['Datahantering och vikter','Om uppgifter inte samlas in digitalt ger fråga 7 värdet 0. Annars räknas andelen av sju positiva alternativ. Frågorna väger lika inom varje område; de sex områdena väger lika i totalen. Avrundning sker först vid visning.'],
 ['Nivåer och återkoppling','Nivåerna är egna spelbenämningar: 0 till under 25, 25 till under 50, 50 till under 75 och 75-100. Texten skapas med fasta lokala regler. XP belönar slutförande och påverkar aldrig mognadspoängen.'],
 ['Tolkning','Modellen är inte EU:s officiella poängnyckel. Den mäter självrapporterad bredd och införandestatus, inte verifierad kvalitet eller affärsnytta. Rapporten är inte en certifiering, säkerhetsrevision eller branschjämförelse.'],
 ['Hantering av rapporten','PDF-filen skapas lokalt på spelarens enhet. Behandla den som intern företagsinformation. Spelet skickar inte rapporten till någon annan och sparar ingen kopia hos kontaktpersonen. Du kan själv välja att bifoga den i ett e-postmeddelande.']
 ];
 for(const [title,body] of sections){text(title,M,my,12,bold);my=para(body,M,my+22,CW,10,regular,muted,15)+22;}
 // Include every item, including unselected alternatives, with the exact confirmed answer.
 function wrapLines(value,width,size=10,font=regular){
  let lines=[],line='';for(const word of safe(value).split(/\s+/)){const next=line?line+' '+word:word;if(line&&font.widthOfTextAtSize(next,size)>width){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);return lines;
 }
 for(const q of model.responses){
  function appendixPage(continuation=false){
   newPage('Svarsbilaga / Frågeomgång '+q.number+' av 11',continuation?'Era svar - fortsättning':q.title);
   let top=continuation?147:Math.max(151,97+wrapLines(q.title.toUpperCase(),CW,27,display).length*32+16);
   if(!continuation){top=para(q.prompt,M,top,CW,10,regular,muted,15)+16;}
   if(q.type==='multi'&&!continuation){top=para(q.none?'Bekräftat svar: Inget av alternativen stämmer.':'Markerat = valt i spelet. Inte markerat = alternativet valdes inte.',M,top,CW,10,bold,ink,15)+15;}
   rect(M,top,CW,27,ink);text('BEDÖMNINGSDEL',M+10,top+7,9,bold,color('#ffffff'));text('ERT SVAR',M+330,top+7,9,bold,color('#ffffff'));
   return top+27;
  }
  let top=appendixPage();
  for(const [i,item] of q.items.entries()){
   const label=item.number+'. '+item.text;
   const height=Math.max(wrapLines(label,300).length,wrapLines(item.answer,CW-350,10,bold).length)*15+16;
   if(top+height>770)top=appendixPage(true);
   rect(M,top,CW,height,i%2?color('#ffffff'):paper);
   para(label,M+10,top+8,300,10,regular,ink,15);
   para(item.answer,M+330,top+8,CW-350,10,bold,ink,15);
   rule(M,top+height,M+CW,top+height,lineColor,.5);top+=height;
  }
 }
 newPage('Ert nästa steg','Vi tar nästa steg tillsammans.','Ett kostnadsfritt samtal om er digitala mognad och möjligheterna framåt.');
 text('Gå igenom er DMA tillsammans med mig',M,195,18,bold);
 para('Vad säger er profil om nuläget? Vilka insatser skulle göra störst skillnad i er verksamhet? Boka ett kostnadsfritt möte där vi går igenom er digitala mognadsanalys och pratar om hur projektet kan hjälpa er på digitaliseringsresan och med implementering av generativ AI.',M,230,CW,12,regular,muted,19);
 rect(M,344,CW,178,paper);
 text(model.contact.name,M+22,368,22,bold);
 const rolePrefix=model.contact.role+' för ';
 text(rolePrefix,M+22,403,12,regular,muted);
 link(model.contact.projectName,model.contact.projectUrl,M+22+regular.widthOfTextAtSize(rolePrefix,12),403);
 text('hos '+model.contact.organisation,M+22,424,12,regular,muted);
 function link(label,url,x,y){
  text(label,x,y,12,bold,green);const width=bold.widthOfTextAtSize(label,12);rule(x,y+16,x+width,y+16,green,.6);
  uriLink(url,x,y-2,width,20);
 }
 link(model.contact.email,'mailto:'+model.contact.email+'?subject='+encodeURIComponent(model.contact.subject),M+22,464);
 link(model.contact.phone,'tel:'+model.contact.phoneLink,M+22,489);
 para('Boka via e-post eller telefon och föreslå en tid som passar er. Du väljer själv om du vill bifoga rapporten. Spelet skickar inga svar automatiskt.',M,544,CW,11,regular,muted,17);
 // Original Swedish artwork, preserving its spacing, proportions and full EU funding statement.
 const fundingWidth=330,fundingHeight=fundingWidth*fundingLogos.height/fundingLogos.width;
 page.drawImage(fundingLogos,{x:(W-fundingWidth)/2,y:H-584-fundingHeight,width:fundingWidth,height:fundingHeight});
 uriLink(model.contact.projectUrl,(W-fundingWidth)/2,584,fundingWidth,fundingHeight);
 const pages=doc.getPages();pages.forEach((p,i)=>{page=p;rule(M,795,W-M,795);text(model.demo?'FIKTIVT EXEMPEL':'INTERN FÖRETAGSINFORMATION',M,808,8,bold,muted);text('Digitala Mognadsresan',240,808,8,regular,muted);text((i+1)+' / '+pages.length,W-M-28,808,8,regular,muted);});
 return doc.save();
}
const api={generate};root.DMAPdf=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
