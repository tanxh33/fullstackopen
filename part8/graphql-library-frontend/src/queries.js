import { gql } from '@apollo/client';

export const ALL_INFO = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
  allBooks {
    title
    author {
      name
      born
      bookCount
      id
    }
    published
    id
  }
}
`;

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook (
    input: {
      title: $title,
      author: {
        name: $author
      },
      published: $published,
      genres: $genres
    }
  ) {
    title
    author {
      name
      born
      id
    }
    published
    id
  }
}
`;

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    bookCount
    id
  }
}
`;

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`;
