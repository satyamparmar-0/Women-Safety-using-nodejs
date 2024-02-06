const mongoose = require('mongoose');

const geofenceSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  radius: Number,
});

  module.exports = mongoose.model('Geofence',geofenceSchema); 