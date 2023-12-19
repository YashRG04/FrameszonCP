const mongoose = require("mongoose")

const shapeSchema = new mongoose.Schema({
    name: String,
    images: [{
        public_id: {
            type: String,
            required: true,
            default: "Sample ID"
        },
        url: {
            type: String,
            required: true,
            default: "Sample url"
        }
    }],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model("Shape", shapeSchema);