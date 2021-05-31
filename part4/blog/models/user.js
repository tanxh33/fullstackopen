const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  // IDs of blogs are stored in User as an array of Mongo IDs, unlike relational DB foreign key.
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }],
});

userSchema.plugin(uniqueValidator);

// Format objects returned by Mongoose
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // The passwordHash should not be revealed.
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
