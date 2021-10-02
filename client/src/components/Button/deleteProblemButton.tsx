import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDeleteProblemMutation } from '../../generated/graphql';

interface Props {
  id: string;
  boardId: string;
}

export const DeleteProblemButton = ({ id, boardId }: Props) => {
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
      toast.success('Problem deleted ☠️');
      router.push(`/boards/${boardId}`);
    }
  };
  return (
    <button className='btn' aria-label='Delete Problem' onClick={handleDelete}>
      <FaTrash size={28} />
    </button>
  );
};
