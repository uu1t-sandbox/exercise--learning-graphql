import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { ROOT_QUERY } from './App';
import { Query, User } from './graphql';

const ADD_FAKE_USERS_MUTATION = gql`
  mutation addFakeUsers($count: Int!) {
    addFakeUsers(count: $count) {
      githubLogin
      name
      avatar
    }
  }
`;

type UserListItemProps = {
  name: string;
  avatar: string;
};

const UserListItem: React.FC<UserListItemProps> = ({ name, avatar }) => (
  <li>
    <img src={avatar} width="48" height="48" alt="" />
    {name}
  </li>
);

type UserListProps = {
  count: Number;
  users: User[];
  refetchUsers: () => void;
};

const UserList: React.FC<UserListProps> = ({ count, users, refetchUsers }) => {
  const [addFakeUsers] = useMutation(ADD_FAKE_USERS_MUTATION, {
    update(cache, { data: { addFakeUsers } }) {
      let { totalUsers, allUsers, ...rest } = cache.readQuery<Query>({
        query: ROOT_QUERY
      }) as Query;
      cache.writeQuery({
        query: ROOT_QUERY,
        data: {
          ...rest,
          totalUsers: totalUsers + addFakeUsers.length,
          allUsers: allUsers.concat(addFakeUsers)
        }
      });
    }
  });
  return (
    <div>
      <p>{count} Users</p>
      <button onClick={refetchUsers}>Refetch Users</button>
      <button onClick={() => addFakeUsers({ variables: { count: 1 } })}>
        Add Fake Users
      </button>
      <ul>
        {users.map(user => (
          <UserListItem
            key={user.githubLogin}
            name={user.name!}
            avatar={user.avatar!}
          />
        ))}
      </ul>
    </div>
  );
};

const Users = () => {
  const { loading, error, data, refetch } = useQuery<Query>(ROOT_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <UserList
      count={data?.totalUsers!}
      users={data?.allUsers!}
      refetchUsers={() => refetch()}
    />
  );
};

export default Users;
