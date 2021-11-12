import styles from '../../styles/BoardItem.module.scss';
import { FaTimes } from 'react-icons/fa';
import { useRemoveFromWhitelistMutation } from '../../generated/graphql';
import { toast } from 'react-toastify';

interface Props {
  name: string;
  email: string;
  boardId: string;
}

export const WhitelistItem = ({ name, email, boardId }: Props) => {
  const [removeFromWhitelist] = useRemoveFromWhitelistMutation();

  const handleDelete = async () => {
    if (
      window.confirm(
        'Are you sure? User will no longer be able to interact with this board.'
      )
    ) {
      await removeFromWhitelist({
        variables: { options: { email, boardId } },
        update: (cache) => {
          cache.evict({ fieldName: 'getWhiteList' });
        },
      });
      toast.success('User removed from whitelist ☠️');
    }
  };
  return (
    <div className={styles.boardItem}>
      <div className={styles.main}>
        <div className={styles.titleDiv}>
          <p className={styles.title}>{name}</p>
          <p>{email}</p>
        </div>
      </div>

      <div className={styles.right}>
        <button
          className='btn btn-delete btn-link'
          aria-label='Remove from Whitelist'
          title='Remove from Whitelist'
          onClick={handleDelete}
        >
          <FaTimes size={28} />
        </button>
      </div>
    </div>
  );
};
