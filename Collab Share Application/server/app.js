const express = require('express'); // Require the express script module
const app = express(); // Create a constant app
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // require the mongoose package for mongodb related operations
const dotenv = require('dotenv').config();

// Required for 
const morgan = require('morgan');

// Define various routes here
const userRoute = require('./api/routes/userroutes');
const socketRoute = require('./api/routes/socketroutes');
// Main mongoose connection to mongoDB schema `collaborator`
mongoose.connect('mongodb://' + process.env.MONGOSCHEMA);


// Middleware. Functions that have access to the req, res and next objects
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
/**
 * Default methods and utility middleware implementations for app use
 * Not to be changed
*/
// Middleware. Functions that have access to the req, res and next objects
app.use(bodyParser.urlencoded({ extended: false })); // true allows to parse extended bodies with rich text
app.use(bodyParser.json()); // Extract json data which is easily readable


// Handle CORS, append headers to any response to be sent before we reach the routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Grant origin access to all incoming requests
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    ); // Define which kind of headers we want to accept
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); // Methods we want our API to support
        return res.status(200).json();
    }
    next();
});


// Use these middleware to handle all requests from the routes mentioned above
app.use('/user', userRoute);
app.use('/collab', socketRoute);




// Error Handling. Handle every request that hits this web app
app.use((req, res, next) => {
    const error = new Error("Page not found"); // Create a error constant, object available by default
    error.status = 404; // Set the status code of the error
    next(error); // Forward the request with the error
});
// Middleware to handle all kinds of errors thrown from anywhere within the application
app.use((error, req, res, next) => {
    res.status(error.status || 500); // Status code returned by the error or default 500
    res.json({
        error: {
            message: error.message
        }
    })
});

// Export this module so that it can be used in other modules
module.exports = app;