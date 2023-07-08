const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionTitle: String,
    questionDesc: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    answers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'answer'
    },
    user: Object
});

module.exports = mongoose.model('question', QuestionSchema);