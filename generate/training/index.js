fs = require('fs');

let arraySizeOne = [
    '1/8"',
    '1/4"',
    '3/8"',
    '1/2"',
    '3/4"',
    '1"',
    '1 1/4"',
    '1 1/2"',
    '2"',
    '2 1/2"',
    '3"',
    '3 1/2"',
    '4"',
    '5"',
    '6"',
    '8"',
    '10"',
    '12"',
    '14"',
    '16"',
    '18"',
    '20"',
    '22"',
    '24"',
    '26"',
    '28"',
    '30"',
    '32"',
    '34"',
    '36"',
    '38"',
    '40"',
    '42"',
    '44"',
    '46"',
    '48"',
    '52"',
    '56"',
    '60"',
    '64"',
    '68"',
    '72"',
    '76"',
    '80"',
    'DN 6',
    'DN 8',
    'DN 10',
    'DN 15',
    'DN 20',
    'DN 25',
    'DN 32',
    'DN 40',
    'DN 50',
    'DN 65',
    'DN 80',
    'DN 90',
    'DN 100',
    'DN 125',
    'DN 150',
    'DN 200',
    'DN 250',
    'DN 300',
    'DN 350',
    'DN 400',
    'DN 450',
    'DN 500',
    'DN 550',
    'DN 600',
    'DN 650',
    'DN 700',
    'DN 750',
    'DN 800',
    'DN 850',
    'DN 900',
    'DN 950',
    'DN 1000',
    'DN 1050',
    'DN 1100',
    'DN 1150',
    'DN 1200',
    'DN 1300',
    'DN 1400',
    'DN 1500',
    'DN 1600',
    'DN 1700',
    'DN 1800',
    'DN 1900',
    'DN 2000',
    '1/8 inch',
    '1/4 inch',
    '3/8 inch',
    '1/2 inch',
    '3/4 inch',
    '1 inch',
    '1 1/4 inch',
    '1 1/2 inch',
    '2 inch',
    '2 1/2 inch',
    '3 inch',
    '3 1/2 inch',
    '4 inch',
    '5 inch',
    '6 inch',
    '8 inch',
    '10 inch',
    '12 inch',
    '14 inch',
    '16 inch',
    '18 inch',
    '20 inch',
    '22 inch',
    '24 inch',
    '26 inch',
    '28 inch',
    '30 inch',
    '32 inch',
    '34 inch',
    '36 inch',
    '38 inch',
    '40 inch',
    '42 inch',
    '44 inch',
    '46 inch',
    '48 inch',
    '52 inch',
    '56 inch',
    '60 inch',
    '64 inch',
    '68 inch',
    '72 inch',
    '76 inch',
    '80 inch',
]

let arrayScheduleOne = [
    'double extra strong',
    'double XS',
    'extra strong',
    'S10',
    'S100',
    'S120',
    'S140',
    'S160',
    'S20',
    'S30',
    'S40',
    'S5',
    'S60',
    'S80',
    'schedule 10',
    'schedule 100',
    'schedule 120',
    'schedule 140',
    'schedule 160',
    'schedule 20',
    'schedule 30',
    'schedule 40',
    'schedule 5',
    'schedule 60',
    'schedule 80',
    'standard',
    'STD',
    'XS',
    'XXS',
    'S10S',
    'schedule 10S',
    'S40S',
    'schedule 40S',
    'S80S',
    'schedule 80S',
    'S5S',
    'schedule 5S'
];

let arrayItem = [
    'pipe',
    'reduceur',
    'cap',
    'elbow',
    'tee',
    'flange',
];

let arrayStart = [
  'what is the ',
  'give me the ',
  'tell me the ',
  '',
];

let arrayIntent = [
    // 'outside diameter of a',
    // 'wall thickness of a',
    // 'OD of a',
    // 'weight of a',
    // 'schedule of a',
    // 'DN of a',
    // 'Nominal Diameter of a',
    'NPS of a',
    'nominal pipe size of a'
];

let arrayBefore = [true, false];

let sentences = [];
for (var i = 0; i < 30; i++) {
    let before = arrayBefore[Math.floor(Math.random() * arrayBefore.length)];
    let start = arrayStart[Math.floor(Math.random() * arrayStart.length)];
    let intent = arrayIntent[Math.floor(Math.random() * arrayIntent.length)];
    let sizeOne = arraySizeOne[Math.floor(Math.random() * arraySizeOne.length)];
    let scheduleOne = arrayScheduleOne[Math.floor(Math.random() * arrayScheduleOne.length)];
    let item = arrayItem[Math.floor(Math.random() * arrayItem.length)];
    
    if (before) {
      sentences.push(`${start}${intent} ${sizeOne} ${scheduleOne} ${item}`);
    } else {
      sentences.push(`${start}${intent} ${sizeOne} ${item} ${scheduleOne}`);
    }
}
fs.writeFile('./generate/training/sentence.json', JSON.stringify(sentences), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
});
