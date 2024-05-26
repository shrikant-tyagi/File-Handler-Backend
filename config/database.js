const mongoose = require('mongoose');

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL , {})
    .then(() => {
        console.log("Successfully connected to database")
    })
    .catch((error) => {
        console.error(error);
        console.log("Unable to connect to database");
    })
}