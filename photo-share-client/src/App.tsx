import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useApolloClient, useSubscription } from '@apollo/react-hooks';

import AuthorizedUser from './AuthorizedUser';
import Users from './Users';
import Photos from './pages/photos';
import PhotosNew from './pages/photos/new';
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
    allPhotos {
      id
      name
      url
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

const LISTEN_FOR_PHOTOS = gql`
  subscription {
    newPhoto {
      id
      name
      url
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

  useSubscription<Subscription>(LISTEN_FOR_PHOTOS, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (data?.newPhoto) {
        const { allPhotos, ...rest } = client.readQuery<Query>({
          query: ROOT_QUERY
        }) as Query;
        client.writeQuery({
          query: ROOT_QUERY,
          data: {
            ...rest,
            allPhotos: [...allPhotos, data.newPhoto]
          }
        });
      }
    }
  });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <>
            <AuthorizedUser />
            <Users />
            <Photos />
          </>
        </Route>
        <Route exact path="/photos/new" component={PhotosNew} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
