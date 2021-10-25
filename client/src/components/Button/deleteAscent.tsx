import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDeleteAscentMutation } from '../../generated/graphql';

interface Props {
  id: string;
}

export const DeleteAscent = ({ id }: Props) => {
  const [deleteAscent] = useDeleteAscentMutation();
  const handleDelete = async () => {
    if (window.confirm('Are you sure? Deletion is permanent.')) {
      await deleteAscent({
        variables: { problemId: id },
        update: (cache) => {
          cache.evict({ id: 'Problem:' + id });
        },
      });
      toast.success('Ascent deleted ☠️');
    }
  };
  return (
    <button
      className='btn btn-link btn-delete'
      aria-label='Delete Ascent'
      onClick={handleDelete}
    >
      <FaTimes size={28} />
    </button>
  );
};
