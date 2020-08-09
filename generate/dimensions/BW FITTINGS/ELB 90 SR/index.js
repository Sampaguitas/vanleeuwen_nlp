var Excel = require('exceljs');
fs = require('fs');
const _ = require('lodash');

let myCollection = [];
var workbook = new Excel.Workbook();

workbook.xlsx.readFile('./generate/dimensions/BW FITTINGS/ELB 90 SR/elb90Sr.xlsx')
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
    if (!!worksheet.getCell('G' + row).value) {
      tagsSizeOne.push(worksheet.getCell('G' + row).value + ' mm');
    }
    if (!!worksheet.getCell('F' + row).value) {
      tagsSizeOne.push(worksheet.getCell('F' + row).value + ' in');
    }
    let sizeOne = {
      'nps': worksheet.getCell('A' + row).value || '',
      'dn': worksheet.getCell('B' + row).value || '',
      'tags': tagsSizeOne
    }
    //scheduleOne
    let tagsScheduleOne = [];
    if (!!worksheet.getCell('C' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('C' + row).value);
    }
    if (!!worksheet.getCell('D' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('D' + row).value);
    }
    if (!!worksheet.getCell('E' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('E' + row).value);
    }
    if (!!worksheet.getCell('I' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('I' + row).value + ' mm');
    }
    if (!!worksheet.getCell('H' + row).value) {
      tagsScheduleOne.push(worksheet.getCell('H' + row).value + ' in');
    }
    let scheduleOne = {
      'idt': worksheet.getCell('C' + row).value || '',
      'sch': worksheet.getCell('D' + row).value || '',
      'schS': worksheet.getCell('E' + row).value || '',
      'tags': tagsScheduleOne
    }
    let myObject = {
      'sizeOne': sizeOne,
      'scheduleOne': scheduleOne,
      'item': 'elbow',
      'angle': '90',
      'radius': 'SR',
      'dimensions': {
        'outsideDiameterRun': {
          'display': 'outside diameter at the bevel',
          'imperial': {
              'value': worksheet.getCell('F' + row).value,
              'uom': 'in'
          },
          'metric' : {
              'value': worksheet.getCell('G' + row).value,
              'uom': 'mm'
          }
        },
        'wallThicknessRun': {
          'display': 'wall thickness',
          'imperial': {
              'value': worksheet.getCell('H' + row).value,
              'uom': 'in'
          },
          'metric': {
            'value': worksheet.getCell('I' + row).value,
            'uom': 'mm'
          }
        },
        'centerToEnd': {
          'display': 'center to end dimension',
          'imperial': {
              'value': worksheet.getCell('J' + row).value,
              'uom': 'in'
          },
          'metric': {
            'value': worksheet.getCell('K' + row).value,
            'uom': 'mm'
          }
      },
        'weight': {
          'display': 'weight',
          'imperial': {
            'value': worksheet.getCell('L' + row).value,
            'uom': 'lb'  
          },
          'metric': {
            'value': worksheet.getCell('M' + row).value,
            'uom': 'kg'
          }
        }
      }
    }
    myCollection.push(myObject);
  }
  fs.writeFile('./generate/dimensions/BW FITTINGS/ELB 90 SR/elb90Sr.json', JSON.stringify(myCollection), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });
});