const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const uesrsModel = mongoose.model("users", userSchema);

module.exports = uesrsModel;