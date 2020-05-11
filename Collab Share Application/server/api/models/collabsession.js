const mongoose = require('mongoose'); // including the mongoose package

const sessionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sessionId: String,
    userId: String,
    sessionData: String,
    sessionRestricted: Boolean
});

module.exports = mongoose.model('CollabSession', sessionSchema);