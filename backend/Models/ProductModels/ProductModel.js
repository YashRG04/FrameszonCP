const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    productCode: {
        type: String,
        required: [true, "Please Enter Product Code"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: [true, "Please Enter a Category"]
    },
    special: {
        type: mongoose.Schema.ObjectId,
        ref: "Special",
    },
    gender: {
        type: mongoose.Schema.ObjectId,
        ref: "Gender",
        required: [true, "Gender not specified"]
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: "Brand",
    },
    shape: {
        type: mongoose.Schema.ObjectId,
        ref: "Shape",
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [{
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String
        }
    }],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)