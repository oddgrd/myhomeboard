import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';
import { useDeleteProblemMutation } from '../../generated/graphql';

interface Props {
  id: string;
  slug: string;
}

export const DeleteProblemButton = ({ id, slug }: Props) => {
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
      router.push(`/boards/${slug}`);
    }
  };
  return (
    <button className='btn' aria-label='Delete Problem' onClick={handleDelete}>
      <FaTrash size={28} />
    </button>
  );
};
