import { FaTrash } from 'react-icons/fa';
import { useDeleteProblemMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

interface Props {
  id: string;
}

export const DeleteProblemButton = ({ id }: Props) => {
  const [deleteProblem] = useDeleteProblemMutation();
  const router = useRouter();
  return (
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
  );
};
