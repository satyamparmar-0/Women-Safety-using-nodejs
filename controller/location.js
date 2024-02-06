// controllers/locationController.js
const Location = require('../models/location');

// Save the user's location to the database
exports.saveUserLocation = async (req, res) => {
    try {
    const { latitude, longitude } = req.body;
    const location = new Location({ latitude, longitude });
    await location.save();
    res.status(201).json({ message: 'Location saved successfully' });
    } catch (error) {
    console.error('Error saving location:', error);
    res.status(500).json({ error: 'Internal Server Error' });
    }
};
