import fs from 'fs';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import resolvers from './resolvers';

const typeDefs = fs.readFileSync('./typedefs.graphql', 'utf-8');

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.end('Welcome to the PhotoSHare API'));

app.listen({ port: 4000 }, () =>
  console.log(
    `GraphQL Server running @ http://localhost:4000${server.graphqlPath}`
  )
);
