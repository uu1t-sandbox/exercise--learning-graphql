import { GraphQLScalarType } from 'graphql';

import { Context } from '../';
import { Photo, PhotoResolvers } from './graphql';

type XPhoto = Photo & {
  _id: string;
  userId: string;
};

const photo: PhotoResolvers<Context, XPhoto> = {
  id: parent => parent.id || parent._id,

  url: parent => `/img/photos/${parent._id}.jpg`,

  postedBy: (parent, args, { db }) =>
    db.collection('users').findOne({ githubLogin: parent.userId })!
};

// TODO: user

const dateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'A valid date time value.',
  parseValue: value => new Date(value),
  serialize: value => new Date(value).toISOString(),
  parseLiteral: (ast: any) => ast.value
});

const Types = {
  Photo: photo as PhotoResolvers<Context>,
  DateTime: dateTime
};

export default Types;
