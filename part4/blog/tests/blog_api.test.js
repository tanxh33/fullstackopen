const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

// Initialise the database before *every* test.
beforeEach(async () => {
  await Blog.deleteMany({});

  // An array of Mongoose objects
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  // Array of promises created by .save()
  const promiseArray = blogObjects.map((blog) => blog.save());
  // Transform promise array into a single promise (executed in parallel)
  await Promise.all(promiseArray);

  // Use for...of to guarantee a specific execution order:
  // for (const blog of helper.initialBlogs) {
  //   const blogObject = new Blog(blog);
  //   await blogObject.save();
  // }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map((r) => r.title);
  expect(titles).toContain('First class tests');
});

test('id property exists', async () => {
  const response = await api.get('/api/blogs');
  console.log(response.body);
  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
