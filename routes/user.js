const express = require("express");
const router = express.Router();
const { handleUserSignup, handleUserLogin,editUserProfile } = require("../controller/user");
const User = require("../models/user");
// const sosRequests = require('../routes/sosData')

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
    const user = req.user; 
    res.render("profile", { user });
  } else {
    res.redirect("/user/login"); 
  }
});

router.get("/edit-profile/:id", async (req, res) => {
  const userId = req.params.id;

  if (userId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }
      res.render("edit-profile", { user });
    } catch (error) {
      console.error("Error while fetching user data:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/user/login");
  }
});
router.post("/edit-profile/:id", editUserProfile);

router.post('/sos', (req, res) => {
  const jsonData = req.body;

  console.log('Received JSON data:', jsonData);

  res.json({ message: 'SOS request received and processed.' });
});
  

router.get('/sos-requests', (req, res) => {
  
  res.json(sosRequests);
});


module.exports = router;

