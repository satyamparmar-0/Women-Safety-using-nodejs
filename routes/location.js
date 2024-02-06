// routes/locationRoute.js
const express = require('express');
const router = express.Router();

// Render the share location view
router.get('/share-location', (req, res) => {
    res.render('location');
});

module.exports = router;
