import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split
} from 'apollo-boost';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';

type Definintion = {
  kind: string;
  operation?: string;
};

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: { reconnect: true }
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token')
    }
  });
  return forward(operation);
});

const httpAuthLink = authLink.concat(httpLink);

const link = split(
  ({ query }) => {
    const { kind, operation }: Definintion = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpAuthLink
);

const client = new ApolloClient({ cache, link });

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
