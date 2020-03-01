import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { ROOT_QUERY } from '../../App';
import { Query } from '../../graphql';

const Photos: React.FC = () => {
  const { loading, error, data } = useQuery<Query>(ROOT_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <>
      {data?.allPhotos.map(photo => (
        <img
          key={photo.id}
          src={`http://localhost:4000${photo.url}`}
          alt={photo.name}
          width="350"
        />
      ))}
    </>
  );
};

export default Photos;
