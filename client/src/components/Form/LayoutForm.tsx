import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useCreateLayoutMutation } from '../../generated/graphql';
import styles from '../../styles/BoardForm.module.scss';

export const LayoutForm = () => {
  const [createLayout] = useCreateLayoutMutation();
  const [layoutData, setLayoutData] = useState({
    title: '',
    description: '',
    file: null
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      setLayoutData({ ...layoutData, file: acceptedFiles[0] });
    },
    [layoutData]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (e: any) =>
    setLayoutData({ ...layoutData, [e.target.name]: e.target.value });
  const handleClick = async (e: any) => {
    e.preventDefault();
    const { errors } = await createLayout({
      variables: {
        title: layoutData.title,
        description: layoutData.description,
        file: layoutData.file,
        boardId: '0b0102b3-4bb0-4659-8cef-2e05c9455edb'
      }
    });
    if (errors) console.log(errors);
  };

  return (
    <div className={styles.boardForm}>
      <h1>Add New Layout</h1>

      <label htmlFor='title'>
        {' '}
        Title
        <input
          type='text'
          name='title'
          placeholder='E.g. "Fall 2021 v1"'
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor='description'>
        {' '}
        Description
        <textarea
          name='description'
          placeholder='Brief description of layout changes'
          onChange={handleChange}
          maxLength={150}
          required
        />
      </label>

      <div {...getRootProps()} className={styles.dropZone}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : layoutData.file ? (
          <p>{(layoutData.file as any).name}</p>
        ) : (
          <p>Drag {"'n'"} drop your file here, or click to select file</p>
        )}
      </div>
      <button
        onClick={handleClick}
        className='btn btn-submit'
        value='Add Board'
        disabled={!layoutData.file}
      >
        Save Layout
      </button>
    </div>
  );
};
