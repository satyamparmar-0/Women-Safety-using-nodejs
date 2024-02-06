const mongoose = require('mongoose');

const userprofile = new mongoose.Schema({
    username: String,
    password: String, // Hashed password should be stored
    name: String,
    email: String,
    phoneNumbers: [String],
    bloodGroup: String,
    address: String,
})

module.exports = mongoose.model('Profile',userprofile);
