const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const DimensionSchema = new Schema({
    sizeOne: {
        npm: {type: String},
        dn: {type: String},
        tags: [{type: String}]
    },
    scheduleOne: {
        idt: {type: String},
        sch: {type: String},
        schS: {type: String},
        tags: [{type: String}]
    },
    sizeTwo: {
        npm: {type: String},
        dn: {type: String},
        tags: [{type: String}]
    },
    scheduleTwo: {
        idt: {type: String},
        sch: {type: String},
        schS: {type: String},
        tags: [{type: String}]
    },
    item: {type: String},
    dimensions: {
        outsideDiameter: {
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        wallThickness: {
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        weight: {
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        }
    }
});

module.exports= Dimension = mongoose.model('dimensions', DimensionSchema);