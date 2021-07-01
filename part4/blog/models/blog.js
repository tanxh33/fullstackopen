const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  // Blog contains reference to User who created it.
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      content: { type: String },
    },
  ],
});

// Format objects returned by Mongoose
blogSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    if (returnedObject.comments) {
      returnedObject.comments.forEach((comment) => {
        comment.id = comment._id.toString();
        delete comment._id;
      });
    }
  },
});

module.exports = mongoose.model('Blog', blogSchema);
