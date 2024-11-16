const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: String,
    platform: String,
    price: Number,
    description: String,
    rating: Number, 
    category: String,
    comments: [
        {
            email: String,
            text: String,
            date: { type: Date, default: Date.now }
        }
    ],
    ratings: [
        {
            rating: Number,
        }
    ],
});

const coursesModel = mongoose.model("courses", courseSchema);

module.exports = coursesModel;
