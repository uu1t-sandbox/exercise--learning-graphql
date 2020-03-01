import { Context } from '../';
import { SubscriptionResolvers } from './graphql';

const Subscription: SubscriptionResolvers<Context> = {
  newPhoto: {
    subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('photo-added')
  },
  newUser: {
    subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('user-added')
  }
};

export default Subscription;
