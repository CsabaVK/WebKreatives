const Excel=require('exceljs');
(async()=>{
 const targets=['Schoenmaker Oranje','Bakker Schoenreparatie'];
 const wb=new Excel.Workbook();
 await wb.xlsx.readFile('D:\\.openclaw\\workspace\\projects\\04-WebKreatives\\leads\\Leads.xlsx');
 const ws=wb.worksheets[0];
 for (const target of targets){
   let found=[];
   for(let r=1;r<=ws.rowCount;r++){
     for(let c=1;c<=12;c++){
       const text=ws.getRow(r).getCell(c).text||'';
       if(text.toLowerCase().includes(target.toLowerCase())) found.push({r,c,text,row:[1,2,3,4,5,6,7,8,9,10,11,12].map(i=>ws.getRow(r).getCell(i).text||'')});
     }
   }
   console.log('TARGET', target, 'MATCHES', found.length);
   for(const m of found) console.log('ROW', m.r, 'COL', m.c, JSON.stringify(m.row));
 }
})();
