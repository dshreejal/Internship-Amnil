const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('quiz', quizSchema);
