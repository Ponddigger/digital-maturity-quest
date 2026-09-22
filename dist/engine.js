/* Local, transparent game scoring. This is not the official EU DMAT algorithm. */
(function(root){
'use strict';
const data=typeof DMA_DATA!=='undefined'?DMA_DATA:require('./questions.js');
const byId=Object.fromEntries(data.questions.map(q=>[q.id,q]));
function validAnswer(q,a){
 if(!q||!a||typeof a!=='object'||a.confirmed!==true||!Array.isArray(a.values))return false;
 if(q.type==='multi')return a.values.every(v=>Number.isInteger(v)&&v>=0&&v<q.items.length)&&new Set(a.values).size===a.values.length&&!(q.exclusive!==undefined&&a.values.includes(q.exclusive)&&a.values.some(v=>v>q.exclusive));
 return a.values.length===q.items.length&&a.values.every(v=>Number.isInteger(v)&&v>=0&&v<q.labels.length);
}
function cleanAnswers(raw){const a={};for(const q of data.questions){if(validAnswer(q,raw?.[q.id]))a[q.id]={confirmed:true,values:[...raw[q.id].values]};}return a;}
function scoreQuestion(q,a){
 if(!validAnswer(q,a))return null;
 if(q.type==='investment')return 100*a.values.filter(v=>v===1||v===3).length/q.items.length;
 if(q.type==='scale')return 100*a.values.reduce((s,v)=>s+v,0)/(q.items.length*(q.labels.length-1));
 if(q.exclusive!==undefined)return a.values.includes(q.exclusive)?0:100*a.values.length/(q.items.length-1);
 return 100*a.values.length/q.items.length;
}
function progress(answers){
 const completed=data.questions.filter(q=>validAnswer(q,answers[q.id])).length;
 const sectorDone=data.sectors.filter(s=>s.questions.every(id=>validAnswer(byId[id],answers[id]))).length;
 return {completed,total:data.questions.length,sectorDone,xp:completed*100+sectorDone*50,percent:Math.round(completed/data.questions.length*100)};
}
function scores(answers){
 const sectors=data.sectors.map(s=>{const values=s.questions.map(id=>scoreQuestion(byId[id],answers[id]));return {...s,score:values.every(v=>v!==null)?values.reduce((a,b)=>a+b,0)/values.length:null};});
 return {sectors,overall:sectors.every(s=>s.score!==null)?sectors.reduce((a,s)=>a+s.score,0)/sectors.length:null};
}
function level(n){return n<25?'På upptäcktsfärd':n<50?'Bygger grunden':n<75?'Utvecklar förmågan':'Driver utvecklingen';}
function demoAnswers(){return Object.fromEntries(data.questions.map((q,i)=>[q.id,{confirmed:true,values:q.type==='multi'?q.items.map((_,j)=>j).filter(j=>j%3!==i%3&&j!==q.exclusive):q.items.map((_,j)=>(j+i)%(q.labels.length))} ]));}
const API={byId,validAnswer,cleanAnswers,scoreQuestion,progress,scores,level,demoAnswers};root.DMAEngine=API;if(typeof module!=='undefined')module.exports=API;
})(typeof window!=='undefined'?window:globalThis);
