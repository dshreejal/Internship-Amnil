const mongoose = require("mongoose");

const connectToMongo = async () => {
    const connect = mongoose.connect(process.env.MongoURL || 'mongodb://localhost:27017/Task-4');

    await connect.then((db) => {
        console.log("Connected to database successfully");
    }, (err) => {
        console.log("Error connecting to database", err);
    }
    );

}

module.exports = connectToMongo;