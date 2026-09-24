/* Versioned, local answer export. No identity fields, scores or network calls. */
(function(root){
'use strict';
const data=typeof DMA_DATA!=='undefined'?DMA_DATA:require('./questions.js');
const engine=typeof DMAEngine!=='undefined'?DMAEngine:require('./engine.js');
const columns=Object.freeze(['schema_version','exportdatum','exempeldata','omrade_id','omrade','fraga_nr','fraga_id','fraga_titel','fragetyp','del_nr','del_text','svar_kod','svar_text']);
const sectorByQuestion=Object.fromEntries(data.sectors.flatMap(s=>s.questions.map(id=>[id,s])));
function localDate(){const now=new Date();return [now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');}
function serializeRows(rows){
 const quote=value=>'"'+String(value??'').replace(/"/g,'""')+'"';
 return '\uFEFF'+rows.map(row=>row.map(quote).join(';')).join('\r\n')+'\r\n';
}
function generate(answers={},options={}){
 const date=options.date??localDate();
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error('Export date must use YYYY-MM-DD.');
 const rows=[columns];
 for(const q of data.questions){
  const sector=sectorByQuestion[q.id],answer=answers?.[q.id],valid=engine.validAnswer(q,answer);
  q.items.forEach((item,index)=>{
   let code='',label='';
   if(valid){
    if(q.type==='multi'){code=answer.values.includes(index)?1:0;label=code?'Vald':'Ej vald';}
    else{code=answer.values[index];label=q.labels[code];}
   }
   rows.push([1,date,options.demo===true?'ja':'nej',sector.id,sector.name,q.number,q.id,q.title,q.type,index+1,item,code,label]);
  });
 }
 return serializeRows(rows);
}
const api={generate,serializeRows};root.DMACsv=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
