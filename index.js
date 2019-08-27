// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();
// Import routes
let apiRoutes = require("./routes/api-routes");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://dbUser:dbPassword1@ds249623.mlab.com:49623/getir-case-study', {useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if (!db) {
    console.log("Error connecting DB")
} else {
    console.log("DB connected successfully")
}

// Setup server port
var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Getir Project'));

// Use Api routes in the App
app.use('/getir', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running on port " + port);
});

module.exports = app; // for testing