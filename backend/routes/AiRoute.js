const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/ask', async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2048,
            temperature: 1,
        });

        const result = response.data.choices[0].text.trim();
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error");
    }
});

module.exports = router;
