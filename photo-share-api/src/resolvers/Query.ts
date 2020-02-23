import { Db } from 'mongodb';

import { QueryResolvers } from './graphql';

type Context = {
  db: Db;
};

const Query: QueryResolvers<Context> = {
  totalPhotos: (parent, args, { db }) =>
    db.collection('photos').estimatedDocumentCount(),

  allPhotos: (parent, args, { db }) =>
    db
      .collection('photos')
      .find()
      .toArray(),

  totalUsers: (parent, args, { db }) =>
    db.collection('users').estimatedDocumentCount(),

  allUsers: (parent, args, { db }) =>
    db
      .collection('users')
      .find()
      .toArray()
};

export default Query;
