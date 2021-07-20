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
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
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
