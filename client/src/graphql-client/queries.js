import {gql} from '@apollo/client'

const getBooks = gql`
    query Query {
        books {
            id
            name
        }
    }
`
const getSingleBook = gql`
    query Query($bookId: ID!) {
        book(id: $bookId) {
            id
            name
            genre
            author {
                name
                age
                books {
                    name
                }
            }
        }
    }
`

const getAuthors = gql`
    query Query {
        authors {
            id
            name
        }
    }
`
export {getBooks, getSingleBook, getAuthors}