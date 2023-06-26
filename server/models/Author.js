const mongoose = require('mongoose')

const Author = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number
    },
})

module.exports = mongoose.model('authors', Author)