// Import Node's built-in web-server module. ES6 modules coming soon?
require('dotenv').config(); // Import environment variables
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

app.use(express.static('build'));
app.use(cors());
app.use(express.json()); // use json-parser middleware

// Morgan middleware logging output
morgan.token('reqBody', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :reqBody'));

// --------------
// ROUTES
// --------------

// GET server homepage
app.get('/', (request, response) => {
  response.send('<h1>Hello there!</h1>');
});

// GET info page
app.get('/info', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.send(`
        <div>Phone book has info for ${persons.length} people</div>
        <br />
        <div>${new Date().toString()}</div>`);
    });
});

// GET all people information
app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    });
});

// GET one person's entry
app.get('/api/persons/:id', (request, response, next) => {
  // Use Mongoose's findById method to fetch an individual entry.
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        // 404 Not Found; id isn't matched inside DB; person has a null value
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// DELETE one person's entry
app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    // eslint-disable-next-line
    .then((result) => {
      // Reply with 204 No Content
      response.status(204).end();
    });
});

// POST to create a new phonebook entry
// eslint-disable-next-line consistent-return
app.post('/api/persons', (request, response, next) => {
  const { body } = request;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  // Update remote database
  newPerson.save()
    // Explicitly convert response data to the correct format, instead
    // of implicitly calling toJSON from response.json().
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.json(savedAndFormattedPerson);
    })
    .catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  // Notice that findByIdUAndUpdate receives a regular JS object, not
  //  a Person object created with the Person constructor function.
  const person = {
    name: body.name,
    number: body.number,
  };

  // Without { new: true }, updatedPerson will contain the original
  // document without the modifications.
  // The function call below will give the object after update/person was applied.
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// Handler of requests with unknown endpoint.
app.use(unknownEndpoint);

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  console.error(error);

  // 400 Bad Request; don't repeat request with the malformed syntax
  if (error.name === 'CastError') {
    // CastError caused by an invalid object id for Mongo.
    return response.status(400).send({ error: 'Malformatted id' });
  } if (error.name === 'ValidationError') {
    // Handle ValidationError when new object doesn't fit Person schema criteria.
    return response.status(400).json({ error: error.message });
  }

  // Pass error to default Express error handler for any other error situations.
  next(error);
};

// Handler of requests with result to errors.
// This has to be the last loaded middleware.
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Without Express:
// Event handler registered to server object, called every time
// a HTTP request is made to this server's address.
// const app = http.createServer((request, response) => {
//   // Respond with status code 200, etc.
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(notes));
// });
