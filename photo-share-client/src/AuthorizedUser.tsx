import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';

import { ROOT_QUERY } from './App';
import { Mutation, Query } from './graphql';

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;

type MeProps = {
  requestCode: () => void;
  signingIn: boolean;
  signOut: () => void;
};

const Me: React.FC<MeProps> = ({ requestCode, signingIn, signOut }) => {
  const { loading, error, data } = useQuery<Query>(ROOT_QUERY);

  if (error) {
    return <p>Error :(</p>;
  }

  if (data?.me) {
    return (
      <div>
        <img src={data.me.avatar!} width="48" height="48" alt="" />
        <h1>{data.me.name}</h1>
        <button onClick={signOut}>Sign Out</button>
        <NavLink to="/photos/new">Post Photo</NavLink>
      </div>
    );
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <button onClick={requestCode} disabled={signingIn}>
      Sign In with GitHub
    </button>
  );
};

const AuthorizedUser = () => {
  const client = useApolloClient();
  const history = useHistory();

  const [signingIn, setSigningIn] = useState(false);

  const [githubAuth] = useMutation<Mutation>(GITHUB_AUTH_MUTATION);

  useEffect(() => {
    if (window.location.search.match(/code=/)) {
      setSigningIn(true);
      const code = window.location.search.replace('?code=', '');

      const auth = async () => {
        const { data } = await githubAuth({ variables: { code } });
        localStorage.setItem('token', data?.githubAuth.token!);
        history.replace('/');
        setSigningIn(false);
      };

      auth();
    }
  }, [githubAuth, history]);

  const requestCode = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user`;
  };

  return (
    <Me
      requestCode={requestCode}
      signingIn={signingIn}
      signOut={() => {
        localStorage.removeItem('token');
        const query = ROOT_QUERY;
        const data = {
          ...client.readQuery({ query }),
          me: null
        };
        client.writeQuery({ query, data });
      }}
    />
  );
};

export default AuthorizedUser;
