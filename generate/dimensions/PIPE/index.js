var Excel = require('exceljs');
fs = require('fs');
const _ = require('lodash');
let myCollection = [];
var workbook = new Excel.Workbook();
workbook.xlsx.readFile('./generate/dimensions/PIPE/pipe.xlsx')
.then(wb => {
  var worksheet = wb.getWorksheet(1);
  worksheet.unprotect();
  let rowCount = worksheet.rowCount;
  for (let row = 2; row < rowCount +1 ; row++) {
    //sizeOne
    let tagsSizeOne = [];
    if (!!worksheet.getCell('A' + row).value) {
      tagsSizeOne.push(worksheet.getCell('A' + row).value);
    }
    if (!!worksheet.getCell('B' + row).value) {
      tagsSizeOne.push(worksheet.getCell('B' + row).value);
    }
    if (!!worksheet.getCell('C' + row).value) {
      tagsSizeOne.push(worksheet.getCell('C' + row).value + ' mm');
    }
    if (!!worksheet.getCell('D' + row).value) {
      tagsSizeOne.push(worksheet.getCell('D' + row).value + ' in');
    }
    let sizeOne = {
      'nps': worksheet.getCell('A' + row).value || '',
      'dn': worksheet.getCell('B' + row).value || '',
      'tags': tagsSizeOne
    }
    //scheduleOne
    let tagsScheduleOne = [];
    if (!!worksheet.getCell('G' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('G' + row).value);
    }
    if (!!worksheet.getCell('H' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('H' + row).value);
    }
    if (!!worksheet.getCell('I' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('I' + row).value);
    }
    if (!!worksheet.getCell('E' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('E' + row).value + ' mm');
    }
    if (!!worksheet.getCell('F' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('F' + row).value + ' in');
    }
    let scheduleOne = {
      'idt': worksheet.getCell('G' + row).value || '',
      'sch': worksheet.getCell('H' + row).value || '',
      'schS': worksheet.getCell('I' + row).value || '',
      'tags': tagsScheduleOne
    }
    let myObject = {
      'sizeOne': sizeOne,
      'scheduleOne': scheduleOne,
      'item': 'pipe',
      'dimensions': {
        'outsideDiameterRun': {
          'display': 'outside diameter',
          'imperial': {
              'value': worksheet.getCell('D' + row).value,
              'uom': 'in'
          },
          'metric' : {
              'value': worksheet.getCell('C' + row).value,
              'uom': 'mm'
          }
        },
        'wallThicknessRun': {
          'display': 'wall thickness',
          'imperial': {
              'value': worksheet.getCell('F' + row).value,
              'uom': 'in'
          },
          'metric': {
            'value': worksheet.getCell('E' + row).value,
            'uom': 'mm'
          }
        },
        'weight': {
          'display': 'weight',
          'imperial': {
            'value': worksheet.getCell('J' + row).value,
            'uom': 'lb/ft'  
          },
          'metric': {
            'value': worksheet.getCell('K' + row).value,
            'uom': 'kg/m'
          }
        }
      }
    }
    myCollection.push(myObject);
  }
  fs.writeFile('./generate/dimensions/PIPE/pipe.json', JSON.stringify(myCollection), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });
});


function alphabet(num){
  var s = '', t;
  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t)/26 | 0;
  }
  return s || undefined;
}
