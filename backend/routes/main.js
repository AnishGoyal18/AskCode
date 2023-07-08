const express = require('express');
const router = express.Router();
const QuestionRouter = require('./QuestionRoute');
const AnswerRouter = require('./AnswerRoute');
const AiRouter = require('./AiRoute');

router.use(QuestionRouter);
router.use(AnswerRouter);
router.use(AiRouter);

router.get('/', (req, res) => {
    res.send('Hello from backend Routes');
});


module.exports = router;