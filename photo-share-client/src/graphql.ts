import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};


export type Mutation = {
   __typename?: 'Mutation',
  githubAuth: AuthPayload,
  fakeUserAuth: AuthPayload,
  postPhoto: Photo,
  addFakeUsers: Array<User>,
};


export type MutationGithubAuthArgs = {
  code: Scalars['String']
};


export type MutationFakeUserAuthArgs = {
  githubLogin: Scalars['ID']
};


export type MutationPostPhotoArgs = {
  input: PostPhotoInput
};


export type MutationAddFakeUsersArgs = {
  count?: Maybe<Scalars['Int']>
};

export type Photo = {
   __typename?: 'Photo',
  id: Scalars['ID'],
  url: Scalars['String'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  category: PhotoCategory,
  postedBy: User,
  taggedUsers: Array<User>,
  created: Scalars['DateTime'],
};

export enum PhotoCategory {
  Selfie = 'SELFIE',
  Portrait = 'PORTRAIT',
  Action = 'ACTION',
  Landscape = 'LANDSCAPE',
  Graphic = 'GRAPHIC'
}

export type PostPhotoInput = {
  name: Scalars['String'],
  category?: Maybe<PhotoCategory>,
  description?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  totalPhotos: Scalars['Int'],
  allPhotos: Array<Photo>,
  totalUsers: Scalars['Int'],
  allUsers: Array<User>,
};

export type Subscription = {
   __typename?: 'Subscription',
  newPhoto: Photo,
  newUser: User,
};

export type User = {
   __typename?: 'User',
  githubLogin: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  avatar?: Maybe<Scalars['String']>,
  postedPhotos: Array<Photo>,
  inPhotos: Array<Photo>,
};


