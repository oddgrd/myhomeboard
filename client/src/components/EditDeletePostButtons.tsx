import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDeleteProblemMutation } from '../generated/graphql';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  id: string;
}

export const EditDeleteProblemButtons = ({ id }: Props) => {
  const [deleteProblem] = useDeleteProblemMutation();
  const router = useRouter();
  const style = {
    display: 'flex',
    gap: '5px',
    marginTop: '0.8rem'
  };
  return (
    <div style={style}>
      <button
        className='btn'
        title='Delete Post'
        aria-label='Delete Post'
        onClick={async () => {
          await deleteProblem({
            variables: { id },
            update: (cache) => {
              cache.evict({ id: 'Problem:' + id });
            }
          });
          router.push('/problems');
        }}
      >
        <FaTrash />
      </button>
      <Link href={`#`}>
        <a className='btn'>
          <FaEdit />
        </a>
      </Link>
    </div>
  );
};
