const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
   "username": String,
  "title": String,
  "content": String,
  "category": String,
  "date": Date,
  "likes": Number,
  "comments": [
    {
      "username": String,
      "content": String,
    },
  ],
});

const BlogModel = mongoose.model("blog", BlogSchema);

module.exports = BlogModel;