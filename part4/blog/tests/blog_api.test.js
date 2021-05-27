const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

// Re-initialise the database before *every* test.
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

describe('HTTP GET', () => {
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

  // Verify that the unique identifier property is named 'id'
  test('id property exists', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('HTTP POST', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'IKINARI STEAK',
      author: 'Sakura Ayane',
      url: 'https://yakuza.fandom.com/wiki/Ikinari_Steak',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).toContain('IKINARI STEAK');
  });

  test('a new post without likes will default it to 0', async () => {
    const newBlog = {
      title: 'Bakuretsu Mahou',
      author: 'Takahashi Rie',
      url: 'https://konosuba.fandom.com/wiki/Megumin',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    blogsAtEnd.forEach((blog) => {
      expect(blog.likes).toBeDefined();
    });
  });

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Grant Sanderson',
      url: 'https://www.3blue1brown.com/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('blog without url is not added', async () => {
    const newBlog = {
      title: '3 Blue 1 Brown',
      author: 'Grant Sanderson',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
