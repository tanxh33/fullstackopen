/* eslint-disable no-underscore-dangle */
const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const { MONGODB_URI } = process.env;
const JWT_SECRET = process.env.SECRET;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Error connection to MongoDB:', error.message);
});

const typeDefs = gql`
  input BookInput {
    title: String!
    published: Int!
    author: AuthorInput!
    genres: [String!]!
  }

  input AuthorInput {
    name: String!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(input: BookInput): Book

    addAuthor(input: AuthorInput): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser (
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments({}),
    authorCount: async () => Author.collection.countDocuments({}),
    allBooks: async (root, args) => {
      try {
      // Incrementally build a query filter based on author and/or genre.
        let query = {};
        if (args.author) {
          const foundAuthor = await Author.find({ name: args.author });
          query = { ...query, author: foundAuthor[0]._id };
        }
        if (args.genre) {
          query = { ...query, genres: { $in: args.genre } };
        }
        const result = await Book
          .find(query)
          .populate('author', { name: 1, born: 1 });
        return result;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    // Allow bookCount to be queried for Authors.
    // Find books where author ID equals this author's ID
    bookCount: async (root) => Book.collection.countDocuments({
      author: mongoose.Types.ObjectId(root._id),
    }),
  },

  Mutation: {
    addBook: async (root, args) => {
      try {
        const { input } = args;
        const foundAuthor = await Author.find({ name: input.author.name });
        let authorId;
        if (foundAuthor.length !== 0) {
          // If author exists, get the author's ID.
          authorId = foundAuthor[0]._id;
        } else {
          // If author doesn't exist, create new author in MongoDB and get its ID.
          const author = new Author({ name: input.author.name, born: input.author.born });
          const returnedAuthor = await author.save();
          authorId = returnedAuthor._id;
        }
        // Create new Book object and save to MongoDB
        const book = new Book({ ...input, author: mongoose.Types.ObjectId(authorId) });
        const savedBook = await book.save();
        // Return the book with authorID field populated with author's details
        const newBook = await Book
          .findById(savedBook._id)
          .populate('author', { name: 1, born: 1 });
        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },

    addAuthor: async (root, args) => {
      // Create new Author object and save to MongoDB
      const author = new Author({ ...args.input });
      try {
        return await author.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },

    // Update birth year and return modified object
    editAuthor: async (root, args) => Author.findOneAndUpdate(
      { name: args.name },
      { born: args.setBornTo },
      { new: true },
    ),

    createUser: (root, args) => {
      const user = new User({ ...args }); // Provide username and favoriteGenre
      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      // We use a hardcoded password for convenience, but we should define passwordHash
      // in the User model and make use of something like bcrypt to compare.
      if (!user || args.password !== 'password123') {
        throw new UserInputError('Wrong credentials');
      }

      // If the username/password pair is valid, return a jwt-token.
      // In GraphQL playground, the authorization header "bearer " is added to a query.
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

// Server object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // The returned object is given to all resolvers as a third parameter,
    // useful for things that are shared by multiple resolvers (like user identification).
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      console.log(decodedToken);
      const currentUser = await User.findById(decodedToken.id);
      console.log(currentUser);
      return { currentUser };
    }
    return undefined;
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
