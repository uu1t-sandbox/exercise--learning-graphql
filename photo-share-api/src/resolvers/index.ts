import { Resolvers } from './graphql';
import Mutation from './Mutation';
import Query from './Query';
import Types from './Types';
import Subscription from './Subscription';

const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription,
  ...Types
};

export default resolvers;
