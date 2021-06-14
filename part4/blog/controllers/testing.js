const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

// Empty the database of all Blogs and Users, for testing purposes.
router.post('/reset', async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = router;
