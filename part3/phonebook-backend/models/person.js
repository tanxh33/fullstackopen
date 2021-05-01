const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

console.log('Connecting to MongoDB...');

mongoose.connect(url, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
})
  // eslint-disable-next-line
  .then((result) => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

// We make use of the validation functionality in Mongoose to
// validate the format of the data before storing it in the DB.
// If the incoming object breaks the constraints, an exception will be thrown.
// https://mongoosejs.com/docs/validation.html
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true,
  },
  number: {
    type: String,
    minlength: 9,
    required: true,
  },
});

// Pre-save validation error for unique fields (person name).
personSchema.plugin(uniqueValidator);

// Format the objects returned by Mongoose
// Applied on all instances of models produced with the schema.
// toJSON method transforms _id into string to be safe.
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
