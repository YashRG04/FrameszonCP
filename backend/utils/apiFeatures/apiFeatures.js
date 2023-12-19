class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search Feature
    Search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
                // regular express
                // i represents case insensitive
                // this is basically using mongodb, here you are making the params for the find fuc of mongoDB
            }
        } : {};

        this.query = this.query.find({...keyword });
        return this;
    }

    // Filter Feature
    Filter() {
        // Making a deep copy of querySyt not a referenced value
        const queryCopy = {...this.queryStr };

        const changeFields = ["category", "gender", "brand", "shape", "special"];

        changeFields.forEach((key) => { if (queryCopy[key]) { queryCopy[key]["in"] = queryCopy[key]["in"].split(',') } });

        // if (queryCopy["category"])
        //     queryCopy["category"]["in"] = queryCopy["category"]["in"].split(',');

        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach((key) => delete queryCopy[key]);

        // filter for price and rating
        let qStr = JSON.stringify(queryCopy);

        qStr = qStr.replace(/\b(gt|gte|lt|lte|in)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(qStr));
        // this.query represents Product.find() in Controller.js and is assigned a new updated func with the neccesary params

        return this;
    }

    Pagination(resultPerPage) {

        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;