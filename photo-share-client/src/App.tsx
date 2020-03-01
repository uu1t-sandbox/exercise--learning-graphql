import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useApolloClient, useSubscription } from '@apollo/react-hooks';

import AuthorizedUser from './AuthorizedUser';
import Users from './Users';
import { Query, Subscription } from './graphql';

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
  }

  fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`;

const LISTEN_FOR_USERS = gql`
  subscription {
    newUser {
      githubLogin
      name
      avatar
    }
  }
`;

const App = () => {
  const client = useApolloClient();

  useSubscription<Subscription>(LISTEN_FOR_USERS, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.newUser) {
        const { totalUsers, allUsers, ...rest } = client.readQuery<Query>({
          query: ROOT_QUERY
        }) as Query;
        client.writeQuery({
          query: ROOT_QUERY,
          data: {
            ...rest,
            totalUsers: totalUsers + 1,
            allUsers: [...allUsers, data.newUser]
          }
        });
      }
    }
  });

  return (
    <BrowserRouter>
      <div>
        <AuthorizedUser />
        <Users />
      </div>
    </BrowserRouter>
  );
};

export default App;
