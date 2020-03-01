import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Photo: ResolverTypeWrapper<Photo>,
  PhotoCategory: PhotoCategory,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Mutation: ResolverTypeWrapper<{}>,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  PostPhotoInput: PostPhotoInput,
  Subscription: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: User,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Photo: Photo,
  PhotoCategory: PhotoCategory,
  DateTime: Scalars['DateTime'],
  Int: Scalars['Int'],
  Mutation: {},
  AuthPayload: AuthPayload,
  PostPhotoInput: PostPhotoInput,
  Subscription: {},
  Boolean: Scalars['Boolean'],
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  githubAuth?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationGithubAuthArgs, 'code'>>,
  fakeUserAuth?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationFakeUserAuthArgs, 'githubLogin'>>,
  postPhoto?: Resolver<ResolversTypes['Photo'], ParentType, ContextType, RequireFields<MutationPostPhotoArgs, 'input'>>,
  addFakeUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddFakeUsersArgs, 'count'>>,
};

export type PhotoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Photo'] = ResolversParentTypes['Photo']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  category?: Resolver<ResolversTypes['PhotoCategory'], ParentType, ContextType>,
  postedBy?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  taggedUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  totalPhotos?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  allPhotos?: Resolver<Array<ResolversTypes['Photo']>, ParentType, ContextType>,
  totalUsers?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newPhoto?: SubscriptionResolver<ResolversTypes['Photo'], "newPhoto", ParentType, ContextType>,
  newUser?: SubscriptionResolver<ResolversTypes['User'], "newUser", ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  githubLogin?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  avatar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  postedPhotos?: Resolver<Array<ResolversTypes['Photo']>, ParentType, ContextType>,
  inPhotos?: Resolver<Array<ResolversTypes['Photo']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  DateTime?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Photo?: PhotoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
