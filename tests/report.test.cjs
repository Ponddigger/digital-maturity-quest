const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../dist/engine.js');
const R=require('../dist/report-model.js');
const P=require('../dist/pdf-export.js');
const D=require('../dist/questions.js');
const {PDFDocument,PDFName,PDFDict,PDFString}=require('../dist/vendor/pdf-lib.min.js');
test('incomplete answers cannot be exported',()=>assert.throws(()=>R.create({})));
test('missing backup or continuity planning makes data the first recommendation',()=>{const a=E.demoAnswers();a.q8.values=[0,1,2];assert.equal(R.create(a).priorities[0].id,'data');});
test('PDF includes a complete answer appendix and only the intended contact links',async()=>{
 const bytes=await P.generate(R.create(E.demoAnswers(),{demo:true,date:'2026-09-22'}));
 assert.equal(Buffer.from(bytes).subarray(0,5).toString(),'%PDF-');
 const doc=await PDFDocument.load(bytes);assert.ok(doc.getPageCount()>=19);
 const annotations=doc.getPages().at(-1).node.Annots();assert.equal(annotations.size(),4);
 const urls=Array.from({length:annotations.size()},(_,i)=>annotations.lookup(i,PDFDict).lookup(PDFName.of('A'),PDFDict).lookup(PDFName.of('URI'),PDFString).decodeText());
 assert.ok(urls.includes('https://digithub.se/'));assert.ok(urls.includes('tel:+46709627036'));
 assert.ok(urls.includes('https://www.techtank.se/'));
 const mail=urls.find(url=>url.startsWith('mailto:jorg.teichgraeber@techtank.se?subject='));assert.ok(mail);assert.ok(!mail.includes('body='));
});
test('zero and full maturity reports generate successfully',async()=>{
 for(const max of [false,true]){
  const a=Object.fromEntries(D.questions.map(q=>[q.id,{confirmed:true,values:q.type==='multi'?(max?q.items.map((_,i)=>i).filter(i=>i!==q.exclusive):[]):q.items.map(()=>max?q.labels.length-1:0)}]));
  const model=R.create(a);assert.equal(model.scores.overall,max?100:0);assert.ok((await PDFDocument.load(await P.generate(model))).getPageCount()>=19);
 }
});

test('appendix preserves all 86 answers, investment combinations, scale endpoints and none selections',()=>{
 const a=E.demoAnswers();a.q1.values=[0,1,2,3,0,1,2,3,0,1];a.q2.values=[];a.q4.values=[0,1,2,3,4,5,0];a.q11.values=[0,1,2,0,2];
 const r=R.create(a);assert.equal(r.responses.length,11);assert.equal(r.responses.reduce((n,q)=>n+q.items.length,0),86);
 assert.equal(r.responses[0].items[2].answer,'Redan investerat: Nej. Planerar investering: Ja.');
 assert.equal(r.responses[0].items[3].answer,'Redan investerat: Ja. Planerar investering: Ja.');
 assert.equal(r.responses[1].none,true);assert.ok(r.responses[1].items.every(i=>i.answer==='Inte markerat'));
 assert.equal(r.responses[3].items[5].answer,'5 · I drift');assert.equal(r.responses[10].items[1].answer,'Delvis');
 a.q1.values[2]=0;assert.equal(r.responses[0].items[2].answer,'Redan investerat: Nej. Planerar investering: Ja.');
});
