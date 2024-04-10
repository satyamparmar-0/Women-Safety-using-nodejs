const User = require("../models/user");

async function handleUserSignup(req, res) {
  try {
    const { username, password, name, email, contactNumber, bloodGroup, address } = req.body;
    await User.create({
      username,
      password,
      name,
      email,
      contactNumber, // Save the contact number
      bloodGroup, // Save the blood group
      address,
    });

    // Redirect or send a response
    res.render("login"); // Redirect to the home page or wherever you want
  } catch (error) {
    console.error("Error while signing up:", error);
    res.status(500).send("Internal Server Error"); // Handle the error gracefully
  }
}


async function handleUserLogin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
      password,
    });

    if (!user) {
      const error = "Invalid username or password ";
      return res.render("login", { error }); // Render the login page with an error message
    }

    // Redirect to  the user's profile and pass the user data
    res.render("profile", { user });
  } catch (error) {
    console.error("Error while signing up:", error);
    res.status(500).send("Internal Server Error"); // Handle the error gracefully
  }
}

async function editUserProfile(req, res) {
  const userId = req.params.id;

  if (userId) {
    if (req.method === "GET") {
      // If it's a GET request, render the edit-profile page
      const user = req.user; // Get the user data from the request
      res.render("edit-profile", { user });
    } else if (req.method === "POST") {
      // If it's a POST request, update the user data
      const { name, email, contactNumber, bloodGroup, address } = req.body;

      try {
        // Find the user by ID and update their profile information
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          {
            name,
            email,
            contactNumber,
            bloodGroup,
            address,
          },
          { new: true } // This option returns the updated user
        );

        if (!updatedUser) {
          return res.status(404).send("User not found");
        }

        // Redirect to the user's profile or another appropriate route
        res.redirect("/user/profile");
      } catch (error) {
        console.error("Error while updating profile:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  } else {
    res.redirect("/user/login");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  editUserProfile,
};

