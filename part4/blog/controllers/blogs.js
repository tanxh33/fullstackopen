const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 }); // Simulate a join query
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post('/', async (request, response) => {
  const { body, token, userid } = request;

  if (!token || !userid) {
    // Respond with 401 unauthorized if no token or ID undefined
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  // Use the user's ID from the token to search database
  const user = await User.findById(userid);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id, // Add user ID to the blog
  });

  const savedBlog = await blog.save();

  // Update blogs[] inside that user
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const newBlog = await Blog
    .findById(savedBlog._id)
    .populate('user', { username: 1, name: 1 });

  response.status(201).json(newBlog);
});

// Post a comment
blogsRouter.post('/:id/comments', async (request, response) => {
  const { body, token, userid } = request;
  const blogId = request.params.id;
  const { comment } = body;

  if (!token || !userid) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(blogId);

  const updatedBlog = await Blog
    .findByIdAndUpdate(
      blogId,
      { comments: blog.comments.concat({ content: comment }) },
      { new: true },
    )
    .populate('user', { username: 1, name: 1 });

  response.status(201).json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blogid = request.params.id;

  const { token, userid } = request;
  if (!token || !userid) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findById(blogid);
  // Check the database blog's user id is the same as the token's user id
  if (blog) {
    if (blog.user.toString() === userid.toString()) {
    // Delete the blog from database if it is.
      blog.remove();
    } else {
      return response.status(401).json({ error: 'unauthorized user' });
    }
  }
  // Respond with 204 No Content.
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;

  // Update blog (eg. number of likes)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .populate('user', { username: 1, name: 1 });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
