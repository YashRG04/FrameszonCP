const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({
    name: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model("Brand", brandSchema);