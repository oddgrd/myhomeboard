import { FaTimes } from 'react-icons/fa';
import { useDeleteAscentMutation } from '../../generated/graphql';

interface Props {
  id: string;
}

export const DeleteAscentButton = ({ id }: Props) => {
  const [deleteAscent] = useDeleteAscentMutation();
  return (
    <button
      className='btn'
      aria-label='Delete Ascent'
      onClick={async () => {
        await deleteAscent({
          variables: { problemId: id },
          update: (cache) => {
            cache.evict({ id: 'Problem:' + id });
          }
        });
      }}
    >
      <FaTimes />
    </button>
  );
};
