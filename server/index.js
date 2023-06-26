const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')
const mongoose = require('mongoose')
const MONGO_URL = require('./env/env')
const mongoDataMethod = require('./data/api')

const app = express()

// connect to MongoDB
mongoose.set('strictQuery', false)
const connectDTB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {

        })
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
    }
}
connectDTB();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethod })
})

async function startServer() {
    await server.start()
    server.applyMiddleware({app})
}
startServer()

app.listen({port: 4000}, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
})


