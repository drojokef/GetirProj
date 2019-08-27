var mongoose = require('mongoose');

// Setup schema
var recordsSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },

    value: {
        type: String,
        required: true
    },

    counts: {
        type: [],
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Export Records model
var Records = module.exports = mongoose.model('records', recordsSchema);
