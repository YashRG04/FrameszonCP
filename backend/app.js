const cookieParser = require("cookie-parser");
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

const errorMiddleware = require("./Middleware/error.js")

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use("*", cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
}));

app.use(fileUpload());

// Route imports
const products = require("./Routes/Product/productRoute");
const users = require("./Routes/User/userRoute.js");
const categories = require("./Routes/Product/categoryRoute.js");

// Routes for usage
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/categories", categories);

// Middleware for errors
app.use(errorMiddleware);

module.exports = app;