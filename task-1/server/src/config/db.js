const mongoose = require("mongoose");


try {
    const connectToMongo = async () => {
        await mongoose.connect(process.env.MongoURL || 'mongodb://0.0.0.0:27017/Task-1');
        console.log('Connected to database successfull');

    }
    module.exports = connectToMongo;
} catch (error) {
    console.log("Unable to connect to database")
}
