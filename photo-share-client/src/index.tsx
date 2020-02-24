import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    });
  }
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
