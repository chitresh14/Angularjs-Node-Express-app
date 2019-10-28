const mongoose = require("mongoose");
//Student Schema
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Student", studentSchema); // collection name : students
