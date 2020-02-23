import { GraphQLScalarType } from 'graphql';

let _id = 4;

let photos = [
  {
    id: '1',
    name: 'Dropping the Heart Chute',
    description: 'The heart chute is one of my favorite chutes',
    category: 'ACTION',
    githubUser: 'gPlake',
    created: '1977/03/28'
  },
  {
    id: '2',
    name: 'Enjoying the sunshine',
    category: 'SELFIE',
    githubUser: 'sSchmidt',
    created: '1985/01/02'
  },
  {
    id: '3',
    name: 'Gunbarrel 25',
    description: '25 laps on gunbarrel today',
    category: 'LANDSCAPE',
    githubUser: 'sSchmidt',
    created: '2018-04-15T19:09:57.308Z'
  }
];

let users = [
  { githubLogin: 'mHattrup', name: 'Mike Hattrup' },
  { githubLogin: 'gPlake', name: 'Glen Plake' },
  { githubLogin: 'sSchmidt', name: 'Scot Schmidt' }
];

let tags = [
  { photoId: '1', userId: 'gPlake' },
  { photoId: '2', userId: 'sSchmidt' },
  { photoId: '2', userId: 'mHattrup' },
  { photoId: '2', userId: 'gPlake' }
];

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: (parent, args) => {
      if (args.after) {
        return photos.filter(
          ({ created }) => new Date(created) >= new Date(args.after)
        );
      }
      return photos;
    }
  },

  Mutation: {
    postPhoto(parent, args) {
      const newPhoto = {
        id: _id++,
        created: new Date(),
        ...args.input
      };
      photos.push(newPhoto);
      return newPhoto;
    }
  },

  Photo: {
    url: parent => `http://example.com/images/${parent.id}.jpg`,
    postedBy: parent =>
      users.find(user => user.githubLogin === parent.githubUser),
    taggedUsers: parent =>
      tags
        .filter(tag => tag.photoId === parent.id)
        .map(({ userId }) => users.find(user => user.githubLogin === userId))
  },

  User: {
    postedPhotos: parent =>
      photos.filter(photo => photo.githubUser === parent.githubLogin),
    inPhotos: parent =>
      tags
        .filter(tag => tag.userId === parent.githubLogin)
        .map(({ photoId }) => photos.find(photo => photo.id === photoId))
  },

  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value.',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: (ast: any) => ast.value
  })
};

export default resolvers;
