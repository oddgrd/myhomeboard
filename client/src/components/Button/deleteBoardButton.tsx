import { useDeleteBoardMutation } from '../../generated/graphql';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface Props {
  boardId: string;
}

export const DeleteBoardButton = ({ boardId }: Props) => {
  const [deleteBoard] = useDeleteBoardMutation();
  const router = useRouter();

  const handleDelete = async () => {
    if (
      window.confirm(
        'Are you sure? Layouts, problems and ascents will be deleted permanently.'
      )
    ) {
      const { errors } = await deleteBoard({
        variables: { boardId },
        update: (cache) => {
          cache.evict({ id: 'Board:' + boardId });
        },
      });
      if (errors) {
        toast.error('Something went wrong');
        return;
      }
      toast.success('Board deleted ☠️');
      router.replace(`/boards`);
    } else {
      return;
    }
  };
  return (
    <>
      <button
        className='btn btn-link btn-dropdown btn-delete'
        aria-label='Delete Board'
        onClick={handleDelete}
      >
        <FaTimes size={30} /> Delete Board
      </button>
    </>
  );
};
