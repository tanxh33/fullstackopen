// Import Node's built-in web-server module. ES6 modules coming soon?
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json()); // use json-parser middleware
app.use(cors());

// Add request body to morgan middleware logging output
morgan.token('reqBody', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :reqBody'));

let persons = [
  {
    id: 1,
    name: 'Emma Watson',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Hermione Granger',
    number: '123-123465',
  },
  {
    id: 3,
    name: 'Luna Lovegood',
    number: '789-876432',
  },
  {
    id: 4,
    name: 'Ginny Weasley',
    number: '479-483721',
  },
  {
    id: 5,
    name: 'Cho Chang',
    number: '999-135790',
  },
];

// Generate an ID using Math.random()
const generateId = (idArray = []) => {
  const upperBound = 1048575;
  let newId = Math.floor(Math.random() * upperBound + 1);

  // Recursively call this function again if the ID already exists
  if (idArray.includes(newId)) {
    newId = generateId(idArray);
  }

  return newId;
};

// --------------
// ROUTES
// --------------

// GET server homepage
app.get('/', (request, response) => {
  response.send('<h1>Hello there!</h1>');
});

// GET info page
app.get('/info', (request, response) => {
  response.send(`
    <div>Phone book has info for ${persons.length} people</div>
    <br />
    <div>${new Date().toString()}</div>`);
});

// GET all people information
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

// GET one person's entry
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id); // Type casting from string to number
  const foundPerson = persons.find((note) => note.id === id);

  if (foundPerson) {
    response.json(foundPerson);
  } else {
    // Handle case where resource is not found.
    response.status(404).end();
  }
});

// DELETE one person's entry
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end(); // Reply with "No Content"
});

// POST to create a new phonebook entry
// eslint-disable-next-line consistent-return
app.post('/api/persons', (request, response) => {
  const { body } = request;

  // Simple error handling for empty name or phone number
  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  // Error handling for a name that already exists
  if (persons.map((person) => person.name).includes(body.name)) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  const newPerson = {
    id: generateId(persons.map((person) => person.id)),
    name: body.name,
    number: body.number,
  };

  // Update our "database"
  persons = persons.concat(newPerson);

  // Return the new person in a response
  response.json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

// Without Express:
// Event handler registered to server object, called every time
// a HTTP request is made to this server's address.
// const app = http.createServer((request, response) => {
//   // Respond with status code 200, etc.
//   response.writeHead(200, { 'Content-Type': 'application/json' });
//   response.end(JSON.stringify(notes));
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on port ${PORT}`);
});
