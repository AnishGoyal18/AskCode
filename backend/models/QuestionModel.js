const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionTitle: String,
    questionDesc: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: Object
});

module.exports = mongoose.model('question', QuestionSchema);