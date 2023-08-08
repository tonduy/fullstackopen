import {gql} from "@apollo/client";

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    id
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author
    published
  }
}
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    id
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo,
  ) {
    name
    id
  }
}
`