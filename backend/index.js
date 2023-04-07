const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./graphql/TypeDefs")
const { resolvers } = require("./graphql/Resolvers")

const app = express();

const SERVER_PORT = 3001;

const DB_CONNECTION_STRING = "mongodb+srv://scrungle:aO9stEnv3ziXq5F2@cluster0.mfenz3g.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority"

async function startServer() {
    const server = new ApolloServer({ typeDefs, resolvers })
    await server.start()
    server.applyMiddleware({ app })
}

startServer()

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((success) => {
    console.log("Success MongoDB Connection!")
}).catch((err) => {
    console.log("Error MongoDB Connection: ", err)
})

app.listen({ port: 3001 }, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/graphql`);
})

// Wil get error if 'graphql' is not given as the endpoint