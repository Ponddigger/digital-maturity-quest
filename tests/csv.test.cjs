const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../dist/csv-export.js');
const E=require('../dist/engine.js');
const D=require('../dist/questions.js');
const expectedColumns=['schema_version','exportdatum','exempeldata','omrade_id','omrade','fraga_nr','fraga_id','fraga_titel','fragetyp','del_nr','del_text','svar_kod','svar_text'];
const options={date:'2026-09-24',demo:true};
function parse(csv){
 const records=[];let record=[],field='',quoted=false;
 for(let i=1;i<csv.length;i++){
  const c=csv[i];
  if(c==='"'){if(quoted&&csv[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
  else if(!quoted&&c===';'){record.push(field);field='';}
  else if(!quoted&&c==='\r'&&csv[i+1]==='\n'){record.push(field);records.push(record);record=[];field='';i++;}
  else field+=c;
 }
 assert.equal(quoted,false);assert.equal(field,'');assert.deepEqual(record,[]);return records;
}
const exportRows=(answers=E.demoAnswers(),opts=options)=>parse(C.generate(answers,opts));
test('CSV uses a UTF-8 BOM, exact ordered header, and CRLF record separators',()=>{
 const csv=C.generate(E.demoAnswers(),options);
 assert.deepEqual([...Buffer.from(csv).subarray(0,3)],[0xef,0xbb,0xbf]);
 assert.equal(csv.split('\r\n')[0],'\uFEFF'+expectedColumns.map(c=>'"'+c+'"').join(';'));
 assert.equal(csv.replace(/\r\n/g,'').includes('\n'),false);assert.ok(csv.endsWith('\r\n'));
});
test('CSV contains exactly 86 answer rows, 13 columns and the original Swedish wording',()=>{
 const [header,...rows]=exportRows();assert.deepEqual(header,expectedColumns);assert.equal(rows.length,86);
 assert.ok(rows.every(row=>row.length===13));assert.deepEqual(rows.map(row=>row[10]),D.questions.flatMap(q=>q.items));
 assert.deepEqual(rows.map(row=>row[5]+':'+row[9]),D.questions.flatMap(q=>q.items.map((_,i)=>q.number+':'+(i+1))));
 const ai=rows.find(row=>row[6]==='q9');assert.equal(ai[3],'automation');assert.equal(ai[4],'AI & automatisering');
 assert.ok(rows.every(row=>row[0]==='1'&&row[1]==='2026-09-24'));
});
test('CSV quotes fields and round-trips semicolons, double quotes, line breaks and Swedish characters',()=>{
 const values=['Åäö; nästa steg','Han sa "Ja"','Första raden\r\nAndra raden','Rad\nTvå'];
 const csv=C.serializeRows([values]);
 assert.equal(csv,'\uFEFF"Åäö; nästa steg";"Han sa ""Ja""";"Första raden\r\nAndra raden";"Rad\nTvå"\r\n');
 assert.deepEqual(parse(csv),[values]);
});
test('multi answers include both selected and unselected choices, including an explicit none',()=>{
 const a=E.demoAnswers();a.q2.values=[0,3];a.q3.values=[];
 const rows=exportRows(a).slice(1);
 const q2=rows.filter(row=>row[6]==='q2');assert.deepEqual(q2.map(row=>row[11]),['1','0','0','1','0','0','0','0','0','0']);
 assert.ok(q2.every(row=>row[12]===(row[11]==='1'?'Vald':'Ej vald')));
 assert.ok(rows.filter(row=>row[6]==='q3').every(row=>row[11]==='0'&&row[12]==='Ej vald'));
});
test('investment combinations and scale labels retain their original zero-based codes',()=>{
 const a=E.demoAnswers();a.q1.values=[0,1,2,3,0,1,2,3,0,1];a.q4.values=[0,1,2,3,4,5,0];a.q11.values=[0,1,2,0,1];
 const rows=exportRows(a).slice(1);
 for(const id of ['q1','q4','q11']){
  const q=D.questions.find(q=>q.id===id);
  assert.deepEqual(rows.filter(row=>row[6]===id).map(row=>row.slice(11)),a[id].values.map(v=>[String(v),q.labels[v]]));
 }
});
test('unanswered, unconfirmed and malformed groups preserve rows with empty answer fields',()=>{
 const a=E.demoAnswers();delete a.q1;a.q2.confirmed=false;a.q4.values[0]=null;
 const rows=exportRows(a).slice(1);assert.equal(rows.length,86);
 assert.ok(rows.filter(row=>['q1','q2','q4'].includes(row[6])).every(row=>row[11]===''&&row[12]===''));
 assert.ok(exportRows({}).slice(1).every(row=>row[11]===''&&row[12]===''));
});
test('fictional examples are explicitly marked; player exports are marked nej',()=>{
 assert.ok(exportRows(E.demoAnswers(),options).slice(1).every(row=>row[2]==='ja'));
 assert.ok(exportRows(E.demoAnswers(),{date:'2026-09-24'}).slice(1).every(row=>row[2]==='nej'));
});
test('CSV ignores identity metadata and scores, without mutating the answers',()=>{
 const a=E.demoAnswers();a.company='PRIVATE TEST VALUE';a.email='PRIVATE TEST VALUE';a.xp=999;
 const before=JSON.stringify(a),csv=C.generate(a,options);
 assert.equal(JSON.stringify(a),before);assert.ok(!csv.includes('PRIVATE TEST VALUE'));
 assert.deepEqual(parse(csv)[0],expectedColumns);
});
