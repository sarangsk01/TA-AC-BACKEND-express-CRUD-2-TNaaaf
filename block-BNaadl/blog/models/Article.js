var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: [String],
    description: [String],
    tags: [String],
    author: [String],
    likes: [Number],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);
