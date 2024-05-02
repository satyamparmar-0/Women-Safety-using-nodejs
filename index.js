const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const app = express()
const port = 3000;
// const passport = require('./passport-config');
const session = require('express-session');
const crypto = require('crypto'); // Import the crypto library
// const sosRequests = require('./routes/sosData')


app.use(express.json());
// connection of MongoDb
require('./connection');
const secretKey = crypto.randomBytes(32).toString('hex'); // 32 bytes (256 bits)
app.use(
  session({
    secret: secretKey, // Use the generated secret key
    resave: false,
    saveUninitialized: true,
  })
);
// app.use(passport.initialize());
// app.use(passport.session());

// Add this middleware to serve static files from the /public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));



const htmlroutes = require('./routes/women_routes');
const userroutes = require('./routes/user');
const locationRoute = require('./routes/location');
const phone = require('./routes/phone');
const geofenceRoutes = require('./routes/geofence');
app.use('/geofencing', geofenceRoutes);
//const profileroutes = require('./routes/profile');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/user',userroutes);
app.use('/location', locationRoute);
app.use('/emergency', phone);
//app.use('/user',profileroutes)

// for static html pages
app.use('/',htmlroutes);

app.get('/', (req, res) => {
    res.send("Hello, World!"); // Sends a response to the browser
});


app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

