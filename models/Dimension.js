const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const DimensionSchema = new Schema({
    sizeOne: {
        nps: {type: String},
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
        nps: {type: String},
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
    angle: {type: String},
    radius: {type: String},
    dimensions: {
        outsideDiameterRun: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        outsideDiameterOutlet: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        wallThicknessRun: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        wallThicknessOutlet: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        centerToEnd: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        centerToCenter: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        backToFace: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        centerToMiddle: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        endToEnd: {
            display: {type: String},
            imperial: {
                value: {type: Number},
                uom: {type: String},
            },
            metric: {
                value: {type: Number},
                uom: {type: String},
            }
        },
        length: {
            display: {type: String},
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
            display: {type: String},
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