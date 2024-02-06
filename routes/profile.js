// const express = require('express');
// const router = express.Router();
// const passport = require('passport'); // Assuming you're using Passport.js for authentication
// const { ensureAuthenticated } = require('../authMiddleware'); // Implement authentication middleware

// const UserController = require('../controller/profile');

// // Render login page
// router.get('/login', (req, res) => {
//   res.render('login');
// });

// // Handle user login
// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/profile', // Redirect on successful login
//   failureRedirect: '/login', // Redirect on failed login
// }));

// // Render user profile page
// router.get('/profile', ensureAuthenticated, (req, res) => {
//     // This route is protected and can only be accessed by authenticated users
//     res.render('profile', { user: req.user });
//   });
  
// // Render edit profile page
// router.get('/edit-profile', ensureAuthenticated, UserController.getEditProfile);

// // Handle profile updates
// router.post('/edit-profile', ensureAuthenticated, UserController.editProfile);

// // Send SMS to selected contacts
// router.post('/send-sms', ensureAuthenticated, UserController.sendSMS);

// module.exports = router;
