const express = require('express');
const router = express.Router();
const AnswerModel = require('../models/AnswerModel');

router.post('/answers', async (req, res) => {
    try {
        await AnswerModel.create({
            answer: req.body.answer,
            questionId: req.body.questionId,
            user: req.body.user,
        }).then(() => {
            res.status(201).send({
                status: true,
                message: "Answer added successfully",
            });
        }).catch((err) => {
            console.log(err)
            res.status(400).send({
                status: false,
                message: "Error 400 while adding answer",
            });
        });
    } catch (e) {
        console.log(e)
        res.status(500).send({
            status: false,
            message: "Error 500 while adding the answer",
        });
    }
});

router.delete('/answers/:id', async (req, res) => {
    try {
        const deletedAnswer = await AnswerModel.findByIdAndDelete(req.params.id);
        if (!deletedAnswer) {
            return res.status(404).send({
                status: false,
                message: "Answer not found",
            });
        }
        res.status(200).send({
            status: true,
            message: "Answer deleted successfully",
            data: deletedAnswer,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            status: false,
            message: "Error 500 while deleting the answer",
        });
    }
});

module.exports = router;