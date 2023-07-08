const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./db');
const router = require('./routes/main');

const app = express();
app.use(cors());
dotenv.config({ path: './.env' });
app.use(express.json());

//mongoose connection
db.connect();

//routes
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


