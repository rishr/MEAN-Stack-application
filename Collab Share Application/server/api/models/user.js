/**
 * Define various models here
 * Based on the functionality to be implemented
 */

const mongoose = require('mongoose'); // including the mongoose package

// Schema that will be used to save data to mongo db
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, // MongoDB generated unique ID
    firstName: String, // Name of the product
    lastName: String, // Last Name
    password: String, // Password
    mainPassword: String,
    contactNumber: Number,
    emailAddress: String,
    profession: String
});

module.exports = mongoose.model('user', userSchema);