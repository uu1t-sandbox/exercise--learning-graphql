import { Resolvers } from './graphql';
import Mutation from './Mutation';
import Query from './Query';
import Types from './Types';

const resolvers: Resolvers = {
  Query,
  Mutation,
  ...Types
};

export default resolvers;
