import path from 'path';

import fetch from 'node-fetch';

import { Context } from '../';
import { authorizeWithGithub, uploadStream } from '../lib';
import { MutationResolvers } from './graphql';

const Mutation: MutationResolvers<Context> = {
  githubAuth: async (parent, { code }, { db, pubsub }) => {
    const {
      access_token,
      avatar_url,
      login,
      message,
      name
    } = await authorizeWithGithub({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    });

    if (message) {
      throw new Error(message);
    }

    const latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url
    };

    const {
      ops: [user],
      upsertedCount
    } = await db
      .collection('users')
      .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });

    if (upsertedCount) {
      pubsub.publish('user-added', { newUser: user });
    }

    return { user, token: access_token };
  },

  fakeUserAuth: async (parent, { githubLogin }, { db }) => {
    const user = await db.collection('users').findOne({ githubLogin });

    if (!user) {
      throw new Error(`Cannot find user with githubLogin \`${githubLogin}\``);
    }

    return {
      token: user.githubToken,
      user
    };
  },

  postPhoto: async (parent, args, { db, currentUser, pubsub }) => {
    if (!currentUser) {
      throw new Error('only an authorized user can post a photo');
    }

    let newPhoto = {
      ...args.input,
      userId: currentUser.githubLogin,
      created: new Date()
    } as any;

    const { insertedIds } = await db.collection('photos').insert(newPhoto);
    newPhoto.id = insertedIds[0];

    const toPath = path.join(
      __dirname,
      '..',
      '..',
      'assets',
      'photos',
      `${newPhoto.id}.jpg`
    );

    const stream = (await args.input.file).createReadStream();
    await uploadStream(stream, toPath);

    pubsub.publish('photo-added', { newPhoto });

    return newPhoto;
  },

  addFakeUsers: async (parent, { count }, { db, pubsub }) => {
    const randomUserApi = `https://randomuser.me/api/?results=${count}`;
    const { results } = await fetch(randomUserApi).then(res => res.json());

    const users = results.map(r => ({
      githubLogin: r.login.username,
      name: `${r.name.first} ${r.name.last}`,
      avatar: r.picture.thumbnail,
      githubToken: r.login.sha1
    }));

    await db.collection('users').insert(users);

    users.map(newUser => pubsub.publish('user-added', { newUser }));

    return users;
  }
};

export default Mutation;
