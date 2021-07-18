/* eslint-disable no-underscore-dangle */
const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();
const Author = require('./models/author');
const Book = require('./models/book');

const { MONGODB_URI } = process.env;

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(input: BookInput): Book

    addAuthor(input: AuthorInput): Author

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
