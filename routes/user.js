const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserLogin,editUserProfile } = require("../controller/user");
const User = require("../models/user");
const sosRequests = require('../routes/sosData')

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", (req, res) => {
  if (req.user) {
    const user = req.user; // You should have the user data in the request if the user is authenticated
    res.render("profile", { user });
  } else {
    res.redirect("/user/login"); // Redirect to the login page if the user is not authenticated
  }
});

router.get("/edit-profile/:id", async (req, res) => {
  const userId = req.params.id;

  if (userId) {
    try {
      // Use await to await the result of the findById call, which returns a promise
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      // User data is available here, so you can render the edit-profile page
      res.render("edit-profile", { user });
    } catch (error) {
      console.error("Error while fetching user data:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/user/login");
  }
});
// Inside user.js route file
// Inside user.js route file
router.post("/edit-profile/:id", editUserProfile);

router.post('/sos', (req, res) => {
  // Parse JSON data from the request body
  const jsonData = req.body;

  console.log('Received JSON data:', jsonData);

  // Handle the JSON data as needed (e.g., send notifications)
  // ...

  res.json({ message: 'SOS request received and processed.' });
});
  

router.get('/sos-requests', (req, res) => {
  // Return the list of SOS requests (for demonstration)
  res.json(sosRequests);
});


module.exports = router;

