const bcrypt = require('bcrypt'); // For hashing password
const usersRouter = require('express').Router();
const User = require('../models/user');

// Return all users in database.
usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

// Create a new User through a POST request.
usersRouter.post('/', async (request, response) => {
  const { body } = request;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
