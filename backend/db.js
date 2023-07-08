const mongoose = require('mongoose');

module.exports.connect = () => {
    try {
        mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log("Mongoose is connected"));
    }
    catch (e) {
        console.log("Error connecting to Mongoose");
    }
};
