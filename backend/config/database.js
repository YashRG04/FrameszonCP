const mongoose = require("mongoose")

const connectDataBase = () => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log(`Listening to server: ${data.connection.host}`)
        })
        // didn;t catched an error since unhandled error is done in server.js
}

module.exports = connectDataBase