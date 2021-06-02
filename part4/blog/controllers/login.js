const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response) => {
  const { body } = request;

  // Search for the user from the database from request.body.username
  const user = await User.findOne({ username: body.username });
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash); // Check with the hash value

  // If the user is not found, or the password is incorrect
  if (!(user && passwordCorrect)) {
    // Respond with 401 unauthorised
    return response.status(401).json({ error: 'invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  // Create a token using the username and user ID, and an environment string variable
  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200) // OK
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
