const Geofence = require("../models/geofence");

// Create a geofence
exports.createGeofence = async (req, res) => {
  const { name, latitude, longitude, radius } = req.body;
  //console.log('Received data:', name, latitude, longitude, radius);

  try {
    // Save the geofence to the database
    const geofence = await Geofence.create({
      name,
      latitude,
      longitude,
      radius,
    });
    res.json(geofence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Retrieve a list of geofences
exports.getGeofences = async (req, res) => {
  try {
    // Specify the fields you want to select in the query
    const geofences = await Geofence.find({}, "name latitude longitude radius");

    res.json(geofences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Monitor a user's location against geofences
exports.monitorLocation = async (req, res) => {
  const userLatitude = parseFloat(req.body.userLatitude);
  const userLongitude = parseFloat(req.body.userLongitude);

  try {
    // Retrieve all geofences from the database
    const geofences = await Geofence.find();
    //console.log("User Coordinates:", userLatitude, userLongitude);

    // Check if the user's location is inside any geofence
    const insideGeofences = geofences.filter((geofence) => {
      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        geofence.latitude,
        geofence.longitude
      );

      // If the distance is less than the geofence radius, the user is inside the geofence
      return distance <= geofence.radius;
    });
    // console.log("Inside Geofences:", insideGeofences);

    if (insideGeofences.length > 0) {
      res.json({ insideGeofences });
    } else {
      res.json({ message: "User is not inside any geofence" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Calculate the Haversine distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}
