const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    answer: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question'
    },
    user: Object
});

module.exports = mongoose.model('answer', AnswerSchema);