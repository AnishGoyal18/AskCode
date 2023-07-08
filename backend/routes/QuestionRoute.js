const express = require('express');
const router = express.Router();
const QuestionModel = require('../models/QuestionModel');

router.post('/questions', async (req, res) => {
    try {
        await QuestionModel.create({
            questionTitle: req.body.questionTitle,
            questionDesc: req.body.questionDesc,
            user: req.body.user,
        }).then(() => {
            res.status(201).send({
                status: true,
                message: "Question added successfully",
            });
        }).catch((err) => {
            console.log(err)
            res.status(400).send({
                status: false,
                message: "Error 400 while adding the Question",
            });
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            status: false,
            message: "Error 500 while adding the question",
        });
    }
});


router.get('/questions', async (req, res) => {
    try {
        await QuestionModel.aggregate([
            {
                $lookup: {
                    from: "answers",
                    localField: "_id",
                    foreignField: "questionId",
                    as: "allAnswers"
                }
            }
        ]).exec().then((doc) => {
            res.status(200).send(doc);
        }).catch((err) => {
            res.status(500).send({
                status: false,
                message: "Error while getting allAnswers"
            });
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            status: false,
            message: "Error 500",
        });
    }
});

router.put('/questions/:id', async (req, res) => {
    try {
        const question = await QuestionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) {
            return res.status(404).send({
                status: false,
                message: "Question not found"
            });
        }
        res.status(200).send({
            status: true,
            message: "Question updated successfully",
            question: question
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: false,
            message: "Error 500 while updating the question"
        });
    }
});

router.delete('/questions/:id', async (req, res) => {
    try {
        const question = await QuestionModel.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).send({
                status: false,
                message: "Question not found"
            });
        }
        res.status(200).send({
            status: true,
            message: "Question deleted successfully"
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: false,
            message: "Error 500 while deleting the question"
        });
    }
});


module.exports = router;