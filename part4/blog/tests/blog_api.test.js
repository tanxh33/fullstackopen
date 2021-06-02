const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');

const api = supertest(app);

describe('Blog api: HTTP GET: when there are initially some notes saved', () => {
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

  describe('HTTP GET: viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToView = blogsAtStart[0];

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
      expect(resultBlog.body).toEqual(processedBlogToView);
    // console.log(resultBlog.body, processedBlogToView);
    });

    test('fails with status code 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId();
      // console.log(validNonexistingId);

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404);
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400);
    });
  });

  describe('HTTP POST: addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'IKINARI STEAK',
        author: 'Sakura Ayane',
        url: 'https://yakuza.fandom.com/wiki/Ikinari_Steak',
        likes: 10,
      };

      const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekretpassword' });
      const { token } = response.body;

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const contents = blogsAtEnd.map((r) => r.title);
      expect(contents).toContain('IKINARI STEAK');
    });

    test('fails with status code 401 without auth token', async () => {
      const newBlog = {
        title: 'IKINARI STEAK',
        author: 'Sakura Ayane',
        url: 'https://yakuza.fandom.com/wiki/Ikinari_Steak',
        likes: 10,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401);
    });

    test('a new post without likes will default it to 0', async () => {
      const newBlog = {
        title: 'Bakuretsu Mahou',
        author: 'Takahashi Rie',
        url: 'https://konosuba.fandom.com/wiki/Megumin',
      };

      const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekretpassword' });
      const { token } = response.body;

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
      blogsAtEnd.forEach((blog) => {
        expect(blog.likes).toBeDefined();
      });
    });

    test('blog without title is not added, with status code 400', async () => {
      const newBlog = {
        author: 'Grant Sanderson',
        url: 'https://www.3blue1brown.com/',
      };

      const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekretpassword' });
      const { token } = response.body;

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test('blog without url is not added, with status code 400', async () => {
      const newBlog = {
        title: '3 Blue 1 Brown',
        author: 'Grant Sanderson',
      };

      const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekretpassword' });
      const { token } = response.body;

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe('HTTP DELETE: deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      // Add a new post, then DELETE it.

      const response = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekretpassword' });
      const { token } = response.body;

      const newBlog = {
        title: 'IKINARI STEAK',
        author: 'Sakura Ayane',
        url: 'https://yakuza.fandom.com/wiki/Ikinari_Steak',
        likes: 10,
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAfterAdding = await helper.blogsInDb();
      expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1);

      const blogToDelete = blogsAfterAdding.filter((b) => b.title === 'IKINARI STEAK')[0];

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);

      // const contents = blogsAtEnd.map((r) => r.title);
      // expect(contents).not.toContain(blogToDelete.title);
    });
  });

  describe('HTTP PUT: update a blog', () => {
    test('succeeds when updating number of likes', async () => {
      const blogsInDb = await helper.blogsInDb();
      const blogToUpdate = blogsInDb[0];
      const blog = { ...blogToUpdate, likes: 343 };

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(updatedBlog.body).toEqual(blog);
      expect(updatedBlog.body.likes).toBe(343);
    });
  });
});

describe('User api: when there is initially one user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekretpassword', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'macawcaw',
      name: 'Hyacinth Macaw',
      password: 'macaw2020',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'password123!',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails when username is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'na',
      name: 'nananana',
      password: 'batman',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('User validation failed: username');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('creation fails when password is too short', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'macawcaw',
      name: 'Hyacinth Macaw',
      password: 'aw',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('User validation failed: password');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
