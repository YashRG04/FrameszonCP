const mongoose = require("mongoose")

const genderSchema = new mongoose.Schema({
    name: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model("Gender", genderSchema);