const express = require('express');
const router = express.Router();
const QuestionModel = require('../models/QuestionModel');

// POST: Create a question
router.post('/questions', async (req, res) => {
    try {
        const question = await QuestionModel.create(req.body);
        res.status(201).send({
            status: true,
            message: "Question added successfully",
            question,
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            status: false,
            message: "Error 400 while adding the Question",
        });
    }
});

// GET: Retrieve all questions with answers
router.get('/questions', async (req, res) => {
    try {
        const questions = await QuestionModel.aggregate([
            {
                $lookup: {
                    from: "answers",
                    localField: "_id",
                    foreignField: "questionId",
                    as: "allAnswers",
                },
            },
        ]);
        res.status(200).send(questions);
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: "Error while getting allAnswers",
        });
    }
});

// PUT: Update a question by ID
router.put('/questions/:id', async (req, res) => {
    try {
        const question = await QuestionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!question) {
            return res.status(404).send({
                status: false,
                message: "Question not found",
            });
        }
        res.status(200).send({
            status: true,
            message: "Question updated successfully",
            question,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: "Error 500 while updating the question",
        });
    }
});

// DELETE: Delete a question by ID
router.delete('/questions/:id', async (req, res) => {
    try {
        const question = await QuestionModel.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).send({
                status: false,
                message: "Question not found",
            });
        }
        res.status(200).send({
            status: true,
            message: "Question deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: "Error 500 while deleting the question",
        });
    }
});

module.exports = router;
