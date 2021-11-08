import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { useCreateLayoutMutation } from '../../generated/graphql';
import { useIsWhitelisted } from '../../hooks/useIsWhitelisted';
import styles from '../../styles/BoardForm.module.scss';

interface Props {
  boardId: string;
}
export const LayoutForm = ({ boardId }: Props) => {
  useIsWhitelisted(boardId);
  const router = useRouter();
  const [createLayout, { error }] = useCreateLayoutMutation();
  const [layoutData, setLayoutData] = useState({
    title: '',
    description: '',
    file: null,
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
    const { errors } = await toast.promise(
      createLayout({
        variables: {
          options: {
            ...layoutData,
            boardId,
          },
        },
        update: (cache) => {
          cache.evict({ fieldName: 'getBoardLayouts' });
          cache.evict({ fieldName: 'getBoard' });
        },
      }),
      {
        pending: 'Uploading layout',
        success: 'Layout added',
        error: 'Something went wrong',
      }
    );
    if (!errors) {
      router.push(`/boards/${boardId}`);
    }
  };

  return (
    <div className={styles.boardForm}>
      <h1>Upload New Layout</h1>
      {error && <p>{error.message}</p>}
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
