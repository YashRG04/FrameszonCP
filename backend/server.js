const app = require("./app");

const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const connectDataBase = require("./config/database.js");

// Uncaought Exception handling
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception Rejection")

})

// Config

dotenv.config({ path: "config/.env" });

// Connecting to DB

connectDataBase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECERET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection
// this detects if there is an connection error between server and db which goes unhandled
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection")

    server.close(() => {
        process.exit();
    })
})