const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://woodencube:${password}@phonebook-app.mo4hv.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const getAllPersons = () => {
  Person.find({})
    .then((persons) => {
      console.log('Retrieving all entries from phonebook:');
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
};

const addNewPerson = (name, number) => {
  const person = new Person({ name, number });

  person.save()
    .then((result) => {
      console.log(`Added ${result.name} number ${result.number} to phonebook`);
      mongoose.connection.close();
    });
};

if (process.argv.length === 3) {
  // If only password provided with no other arguments,
  // show all phonebook entries.
  getAllPersons();
} else {
  // Code reaches here only if argv.length > 3.
  // Add a new entry to the phonebook.
  const name = process.argv[3];
  const phoneNumber = process.argv[4];

  addNewPerson(name, phoneNumber);
}
