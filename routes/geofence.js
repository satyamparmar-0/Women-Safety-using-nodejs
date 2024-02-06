const express = require('express');
const router = express.Router();
const geofenceController = require('../controller/geofence');

// Route to create a geofence
router.post('/geofences', geofenceController.createGeofence);

// Route to get a list of geofences
router.get('/geofences', geofenceController.getGeofences);

// Route to monitor a user's location against geofences
router.post('/monitor-location', geofenceController.monitorLocation);

module.exports = router;
