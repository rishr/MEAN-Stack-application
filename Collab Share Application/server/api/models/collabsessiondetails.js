const mongoose = require('mongoose'); // including the mongoose package

const sessionDetailsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sessionId: String,
    userEmail: String,
    userToken: String,
    hasJoined: Boolean,
    isActive: Boolean
});

module.exports = mongoose.model('CollabSessionDetails', sessionDetailsSchema);