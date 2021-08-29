import { useCallback, useEffect, useState } from 'react';
import { useCreateBoardMutation } from '../../generated/graphql';
import { useDropzone } from 'react-dropzone';
import styles from '../../styles/BoardForm.module.scss';
export const BoardForm = () => {
  const [boardData, setBoardData] = useState({
    title: '',
    description: '',
    file: null
  });
  const [createBoard] = useCreateBoardMutation();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setBoardData({ ...boardData, file: acceptedFiles[0] });
    },
    [boardData]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleFile = (e: any) => {
    setBoardData({ ...boardData, file: e.target.files[0] });
  };
  const handleChange = (e: any) =>
    setBoardData({ ...boardData, [e.target.name]: e.target.value });
  const handleClick = async (e: any) => {
    e.preventDefault();
    console.log(boardData);
    const { errors } = await createBoard({
      variables: {
        title: boardData.title,
        description: boardData.description,
        file: boardData.file
      }
    });
    if (errors) console.log(errors);
  };

  return (
    <div className={styles.boardForm}>
      <h1>Add New Board</h1>

      <label htmlFor='title'>
        {' '}
        Title
        <input
          type='text'
          name='title'
          placeholder='Board title'
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor='description'>
        {' '}
        Description
        <textarea
          name='description'
          placeholder='Board description'
          onChange={handleChange}
          maxLength={150}
          required
        />
      </label>

      <div {...getRootProps()} className={styles.dropZone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : boardData.file ? (
          <p>{(boardData.file as any).name}</p>
        ) : (
          <p>Drag {"'n'"} drop your file here, or click to select file</p>
        )}
      </div>
      <button
        onClick={handleClick}
        className='btn btn-submit'
        value='Add Board'
        disabled={!boardData.file}
      >
        Save Board
      </button>
    </div>
  );
};
