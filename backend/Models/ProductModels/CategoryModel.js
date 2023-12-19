const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model("Category", categorySchema);