const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // MongoDB generated unique ID
  userId: String, // User ID
  postTitle: String, // Post title
  postDescription: String, // post description
});

module.exports = mongoose.model('post', postSchema);