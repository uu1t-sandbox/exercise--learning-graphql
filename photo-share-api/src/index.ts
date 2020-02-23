import fs from 'fs';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { MongoClient } from 'mongodb';

import resolvers from './resolvers';

const typeDefs = fs.readFileSync('../graphql/schema.graphql', 'utf-8');

const start = async () => {
  const app = express();

  const client = await MongoClient.connect('mongodb://localhost:27017/v1', {
    useNewUrlParser: true
  });
  const db = client.db();

  const context = { db };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  server.applyMiddleware({ app });

  app.get('/', (req, res) => res.end('Welcome to the PhotoSHare API'));

  app.listen({ port: 4000 }, () =>
    console.log(
      `GraphQL Server running @ http://localhost:4000${server.graphqlPath}`
    )
  );
};

start();
