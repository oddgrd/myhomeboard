import { FaTrash } from 'react-icons/fa';
import { useDeleteProblemMutation } from '../../generated/graphql';
import { useRouter } from 'next/router';

interface Props {
  id: string;
}

export const DeleteProblemButton = ({ id }: Props) => {
  const [deleteProblem] = useDeleteProblemMutation();
  const router = useRouter();

  const handleDelete = async () => {
    if (
      window.confirm(
        'Are you sure? Problem and ascents will be deleted permanently.'
      )
    ) {
      await deleteProblem({
        variables: { id },
        update: (cache) => {
          cache.evict({ id: 'Problem:' + id });
        }
      });
      router.push('/problems');
    }
  };
  return (
    <button className='btn' aria-label='Delete Problem' onClick={handleDelete}>
      <FaTrash size={22} />
    </button>
  );
};
