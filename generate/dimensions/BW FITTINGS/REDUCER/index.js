var Excel = require('exceljs');
fs = require('fs');
const _ = require('lodash');

let myCollection = [];
var workbook = new Excel.Workbook();

workbook.xlsx.readFile('./generate/dimensions/BW FITTINGS/REDUCER/reducer.xlsx')
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
    if (!!worksheet.getCell('I' + row).value) {
      tagsSizeOne.push(worksheet.getCell('I' + row).value + ' mm');
    }
    if (!!worksheet.getCell('H' + row).value) {
      tagsSizeOne.push(worksheet.getCell('H' + row).value + ' in');
    }
    let sizeOne = {
      'nps': worksheet.getCell('A' + row).value || '',
      'dn': worksheet.getCell('B' + row).value || '',
      'tags': tagsSizeOne
    }
    //sizeTwo
    let tagsSizeTwo = [];
    if (!!worksheet.getCell('C' + row).value) {
      tagsSizeTwo.push(worksheet.getCell('C' + row).value);
    }
    if (!!worksheet.getCell('D' + row).value) {
      tagsSizeTwo.push(worksheet.getCell('D' + row).value);
    }
    if (!!worksheet.getCell('M' + row).value) {
      tagsSizeTwo.push(worksheet.getCell('M' + row).value + ' mm');
    }
    if (!!worksheet.getCell('L' + row).value) {
      tagsSizeTwo.push(worksheet.getCell('L' + row).value + ' in');
    }
    let sizeTwo = {
      'nps': worksheet.getCell('C' + row).value || '',
      'dn': worksheet.getCell('D' + row).value || '',
      'tags': tagsSizeTwo
    }
    //scheduleOne
    let tagsScheduleOne = [];
    if (!!worksheet.getCell('E' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('E' + row).value);
    }
    if (!!worksheet.getCell('F' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('F' + row).value);
    }
    if (!!worksheet.getCell('G' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('G' + row).value);
    }
    if (!!worksheet.getCell('K' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('K' + row).value + ' mm');
    }
    if (!!worksheet.getCell('J' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('J' + row).value + ' in');
    }
    let scheduleOne = {
      'idt': worksheet.getCell('E' + row).value || '',
      'sch': worksheet.getCell('F' + row).value || '',
      'schS': worksheet.getCell('G' + row).value || '',
      'tags': tagsScheduleOne
    }
    let myObject = {
      'sizeOne': sizeOne,
      'sizeTwo': sizeTwo,
      'scheduleOne': scheduleOne,
      'item': 'reducer',
      'dimensions': {
        'outsideDiameterRun': {
          'display': 'outside diameter at large end',
          'imperial': {
              'value': worksheet.getCell('H' + row).value,
              'uom': 'in'
          },
          'metric' : {
              'value': worksheet.getCell('I' + row).value,
              'uom': 'mm'
          }
        },
        'outsideDiameterOutlet': {
          'display': 'outside diameter at small end',
          'imperial': {
              'value': worksheet.getCell('L' + row).value,
              'uom': 'in'
          },
          'metric' : {
              'value': worksheet.getCell('M' + row).value,
              'uom': 'mm'
          }
        },
        'wallThicknessRun': {
          'display': 'wall thickness at large end',
          'imperial': {
              'value': worksheet.getCell('J' + row).value,
              'uom': 'in'
          },
          'metric': {
            'value': worksheet.getCell('K' + row).value,
            'uom': 'mm'
          }
        },
        'wallThicknessOutlet': {
          'display': 'wall thickness at small end',
          'imperial': {
              'value': worksheet.getCell('N' + row).value,
              'uom': 'in'
          },
          'metric': {
            'value': worksheet.getCell('O' + row).value,
            'uom': 'mm'
          }
        },
        'endToEnd': {
          'display': 'end to end dimension',
          'imperial': {
              'value': worksheet.getCell('P' + row).value,
              'uom': 'in'
          },
          'metric': {
            'value': worksheet.getCell('Q' + row).value,
            'uom': 'mm'
          }
        },
        'weight': {
          'display': 'weight',
          'imperial': {
            'value': worksheet.getCell('R' + row).value,
            'uom': 'lb'  
          },
          'metric': {
            'value': worksheet.getCell('S' + row).value,
            'uom': 'kg'
          }
        }
      }
    }
    myCollection.push(myObject);
  }
  fs.writeFile('./generate/dimensions/BW FITTINGS/REDUCER/reducer.json', JSON.stringify(myCollection), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });
});