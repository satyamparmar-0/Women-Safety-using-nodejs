const User = require('../models/user');
const twilio = require('twilio')('AC518016354dfdff431a3c8132ac42cbad', 'YOUR_TWILIO_AUTH_TOKEN');

// Render user profile page
exports.getProfile = (req, res) => {
  const user = req.user; 
  res.render('profile', { user });
};

// Render edit profile page
exports.getEditProfile = (req, res) => {
  const user = req.user; 
  res.render('edit-profile', { user });
};

// Handle profile updates
exports.editProfile = async (req, res) => {
  const userId = req.user._id; 
  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    phoneNumbers: req.body.phoneNumbers.split(',').map(num => num.trim()), 
    bloodGroup: req.body.bloodGroup,
    address: req.body.address,
  };

  try {
    
    await User.findByIdAndUpdate(userId, updatedData);
    res.redirect('/profile');
  } catch (error) {
    console.error('Error while updating profile:', error);
    res.status(500).send('Internal Server Error');
  }
};


exports.sendSMS = async (req, res) => {
  const user = req.user;
  const selectedContacts = user.phoneNumbers;

  try {
    for (const contact of selectedContacts) {
      await twilio.messages.create({
        body: 'Check out my location: https://www.google.com/maps?q=latitude,longitude',
        from: 'YOUR_TWILIO_PHONE_NUMBER',
        to: contact,
      });
    }
    res.status(200).send('SMS sent successfully.');
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).send('Failed to send SMS.');
  }
};
