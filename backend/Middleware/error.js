const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB ID error
    if (err.name === "CastError") {
        const message = `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate keu error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Enetered`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, try again";
        err = new ErrorHandler(message, 400);
    }

    // JWT expire error
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token is expired, try again";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
            success: false,
            error: err.stack,
            message: err.message
        })
        // this is the status to be shown and the things to be shown if any eroor occurs from server side
}