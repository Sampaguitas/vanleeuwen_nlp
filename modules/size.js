const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const SizeSchema = new Schema({
    nps: {
        type: String,
    },
    dn: {
        type: String,
    },
    mm: {
        type: Number,
    },
    in: {
        type: Number,
    },
    tags: [{type: String}],
});

module.exports= Size = mongoose.model('sizes', SizeSchema);