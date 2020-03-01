import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

import { Mutation, PhotoCategory } from '../../graphql';

const POST_PHOTO_MUTATION = gql`
  mutation postPhoto($input: PostPhotoInput!) {
    postPhoto(input: $input) {
      id
      name
      url
    }
  }
`;

const PhotosNew: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PhotoCategory>(
    PhotoCategory.Portrait
  );
  const [file, setFile] = useState<File | null>(null);

  const [postPhoto] = useMutation<Mutation>(POST_PHOTO_MUTATION);

  const submit = async () => {
    await postPhoto({
      variables: {
        input: {
          name,
          description,
          category,
          file
        }
      }
    }).catch(error => console.error(error));
    history.replace('/');
  };

  return (
    <form
      onSubmit={e => e.preventDefault()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}
    >
      <h1>Post a Photo</h1>

      <input
        type="text"
        style={{ margin: '10px' }}
        placeholder="photo name..."
        value={name}
        onChange={event => setName(event.target.value)}
      />

      <textarea
        style={{ margin: '10px' }}
        placeholder="photo description..."
        value={description}
        onChange={event => setDescription(event.target.value)}
      />

      <select
        value={category}
        style={{ margin: '10px' }}
        onChange={event => setCategory(event.target.value as PhotoCategory)}
      >
        {Object.values(PhotoCategory).map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="file"
        style={{ margin: '10px' }}
        accept="image/jpeg"
        onChange={event =>
          setFile(
            event.target.files && event.target.files.length
              ? event.target.files[0]
              : null
          )
        }
      />

      <div style={{ margin: '10px' }}>
        <button onClick={submit}>Post Photo</button>
        <button onClick={() => history.goBack()}>Cancel</button>
      </div>
    </form>
  );
};

export default PhotosNew;
