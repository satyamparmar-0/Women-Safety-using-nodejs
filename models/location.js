// models/Location.js
const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
});

module.exports = mongoose.model('Location', locationSchema);
