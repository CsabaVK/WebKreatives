const Excel=require('exceljs');
(async()=>{
 const wb=new Excel.Workbook();
 await wb.xlsx.readFile('D:\\.openclaw\\workspace\\projects\\04-WebKreatives\\leads\\Leads.xlsx');
 const ws=wb.worksheets[0];
 console.log('SHEET', ws.name, 'ROWS', ws.rowCount, 'COLS', ws.columnCount);
 const headers=[]; for(let c=1;c<=12;c++) headers.push(ws.getRow(1).getCell(c).text||'');
 console.log('HEADERS', JSON.stringify(headers));
 let nonEmpty=[];
 for(let r=2;r<=ws.rowCount;r++){
   let texts=[]; for(let c=1;c<=12;c++) texts.push(ws.getRow(r).getCell(c).text||'');
   if(texts.some(Boolean)) nonEmpty.push({r,texts});
 }
 console.log('NONEMPTY_COUNT', nonEmpty.length);
 for(const item of nonEmpty.slice(-20)) console.log('ROW', item.r, JSON.stringify(item.texts));
})();
