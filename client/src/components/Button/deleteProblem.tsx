import { useRouter } from 'next/router';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDeleteProblemMutation } from '../../generated/graphql';

interface Props {
  id: string;
  boardId: string;
}

export const DeleteProblem = ({ id, boardId }: Props) => {
  const [deleteProblem] = useDeleteProblemMutation();
  const router = useRouter();

  const handleDelete = async () => {
    if (
      window.confirm(
        'Are you sure? Problem and ascents will be deleted permanently.'
      )
    ) {
      const { errors } = await deleteProblem({
        variables: { id },
        update: (cache) => {
          cache.evict({ id: 'Problem:' + id });
        },
      });
      if (errors) {
        toast.error('Something went wrong');
        return;
      }
      toast.success('Problem deleted ☠️');
      router.push(`/boards/${boardId}`);
    } else {
      return;
    }
  };
  return (
    <>
      <button
        className='btn btn-link btn-delete'
        aria-label='Delete Problem'
        title='Delete Problem'
        onClick={handleDelete}
      >
        <FaTimes size={30} />
      </button>
    </>
  );
};
