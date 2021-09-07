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
      aria-label='Delete Problem'
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
      <FaTrash size={22} />
    </button>
  );
};
