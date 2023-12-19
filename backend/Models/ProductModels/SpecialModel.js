const mongoose = require("mongoose")

const specialSchema = new mongoose.Schema({
    name: String,
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model("Special", specialSchema);