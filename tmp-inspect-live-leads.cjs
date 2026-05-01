const Excel=require('exceljs');
(async()=>{
 const wb=new Excel.Workbook();
 await wb.xlsx.readFile('D:\\.openclaw\\workspace\\projects\\04-WebKreatives\\leads\\Leads.xlsx');
 const ws=wb.worksheets[0];
 console.log('ROWS', ws.rowCount, 'COLS', ws.columnCount);
 for (let r=1; r<=8; r++) {
   const vals=[]; for (let c=1;c<=12;c++) vals.push(ws.getRow(r).getCell(c).text||'');
   console.log(r + '\t' + vals.join(' | '));
 }
 let last=[];
 for (let r=ws.rowCount; r>=2 && last.length<8; r--) {
   const vals=[]; for (let c=1;c<=12;c++) vals.push(ws.getRow(r).getCell(c).text||'');
   if (vals.some(Boolean)) last.push({r,vals});
 }
 last.reverse().forEach(x=>console.log(x.r + '\t' + x.vals.join(' | ')));
})();
