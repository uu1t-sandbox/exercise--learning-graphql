import fs from 'fs';
import { createServer } from 'http';
import path from 'path';

import { ApolloServer, PubSub } from 'apollo-server-express';
import express from 'express';
import { MongoClient, Db } from 'mongodb';

import { User } from './resolvers/graphql';
import resolvers from './resolvers';

const typeDefs = fs.readFileSync('../graphql/schema.graphql', 'utf-8');
const MONGO_DB = 'mongodb://root:root@localhost:27017/';

export type Context = {
  db: Db;
  currentUser: User;
  pubsub: PubSub;
};

const start = async () => {
  const app = express();

  const client = await MongoClient.connect(MONGO_DB, { useNewUrlParser: true });
  const db = client.db();

  const pubsub = new PubSub();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
      const githubToken = req
        ? req.headers.authorization
        : connection.context.Authorization;
      const currentUser = await db.collection('users').findOne({ githubToken });
      return { db, currentUser, pubsub };
    }
  } as any);

  server.applyMiddleware({ app });

  app.get('/', (req, res) => res.end('Welcome to the PhotoSHare API'));

  app.use(
    '/img/photos',
    express.static(path.join(__dirname, '..', 'assets', 'photos'))
  );

  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: 4000 }, () =>
    console.log(
      `GraphQL Server running @ http://localhost:4000${server.graphqlPath}`
    )
  );
};

start();
