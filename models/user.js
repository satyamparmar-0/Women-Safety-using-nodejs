const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // Use "required" instead of "require"
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    email: String,
    bloodGroup: String,
    address: String,
    contactNumber: String,

});

module.exports = mongoose.model('User', userSchema); 