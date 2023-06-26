const mongoose = require('mongoose')

const Book = new mongoose.Schema({
    name: {
        type: String
    },
    genre: {
        type: String
    },
    authorId: {
        type: String
    }
})

module.exports = mongoose.model('books', Book)