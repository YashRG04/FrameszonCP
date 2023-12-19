module.exports = (AsyncError) => (req, res, next) => {

    Promise.resolve(AsyncError(req, res, next)).catch(next);

}

// this is basically try catch block separately written instaed of writing try catch for each func in an controller