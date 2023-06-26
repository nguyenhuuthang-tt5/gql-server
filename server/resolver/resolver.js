const Book = require('../models/Book')
const Author = require('../models/Author')

const resolvers = {
    Query: {
        books: async (parent, args, { mongoDataMethod }) => await mongoDataMethod.getAllBooks(), 
        book: async (parent, args, { mongoDataMethod }) => await mongoDataMethod.findBookById(args.id),
        //
        authors: async (parent, args, { mongoDataMethod }) => await mongoDataMethod.getAllAuthors(),
        author: async (parent, args, { mongoDataMethod }) => await mongoDataMethod.findAuthorById(args.id)
    },
    Book: {
        author: async ({authorId}, args, { mongoDataMethod }) => await mongoDataMethod.findAuthorById(authorId),
    },
    Author: {
        books: async (parent, agrs, { mongoDataMethod }) => await mongoDataMethod.getAllBooks({authorId: parent.id})
    },
    Mutation: {
        createAuthor: async (parent, args, { mongoDataMethod }) => await mongoDataMethod.createAuthor(args),
        createBook: async (parent, args, { mongoDataMethod }) => await mongoDataMethod.createBook(args)
    }
}

module.exports = resolvers