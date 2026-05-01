const Excel=require('exceljs');
(async()=>{
 const wb=new Excel.Workbook();
 await wb.xlsx.readFile('D:\\.openclaw\\workspace\\projects\\04-WebKreatives\\leads\\Leads.xlsx');
 const ws=wb.worksheets[0];
 for (let r=158; r<=162; r++) {
   const vals=[]; for (let c=1;c<=12;c++) vals.push(ws.getRow(r).getCell(c).text||'');
   console.log(r + '\t' + vals.join(' | '));
 }
})();
