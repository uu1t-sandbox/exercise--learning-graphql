import { Context } from '../';
import { QueryResolvers } from './graphql';

const Query: QueryResolvers<Context> = {
  me: (parent, args, { currentUser }) => currentUser,

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
