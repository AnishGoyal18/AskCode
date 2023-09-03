const express = require('express');
const router = express.Router();
const AnswerModel = require('../models/AnswerModel');

// POST: Create an answer
router.post('/answers', async (req, res) => {
    try {
        const answer = await AnswerModel.create(req.body);
        res.status(201).send({
            status: true,
            message: "Answer added successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(400).send({
            status: false,
            message: "Error 400 while adding answer",
        });
    }
});

// DELETE: Delete an answer by ID
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
    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: "Error 500 while deleting the answer",
        });
    }
});

module.exports = router;
