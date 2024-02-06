// routes/emergencyRoutes.js
const express = require('express');
const router = express.Router();
const emergencyController = require('../controller/phone');

// Define the route to call the police
router.get('/police', emergencyController.callEmergency.bind(null, 'police'));

// Define the route to call an ambulance
router.get('/ambulance', emergencyController.callEmergency.bind(null, 'ambulance'));

module.exports = router;
