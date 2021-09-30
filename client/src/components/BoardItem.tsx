import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import { BoardCoreFragment } from '../generated/graphql';
import styles from '../styles/BoardItem.module.scss';
import { FaCog } from 'react-icons/fa';
interface Props {
  board: BoardCoreFragment;
  currentUser?: string;
}

export const BoardItem = ({ board, currentUser }: Props) => {
  const { title, angles, adjustable, currentLayout, location, id, creatorId } =
    board;
  const apolloClient = useApolloClient();
  const handleClick = () => {
    apolloClient.cache.evict({ fieldName: 'getProblems' });
  };

  return (
    <div className={styles.boardItem}>
      <Link href={`/boards/${id}`}>
        <a onClick={handleClick} className={styles.content}>
          <div className={styles.titleDiv}>
            <p className={styles.title}>{title}</p>
            {location && <p>{location}</p>}
          </div>
        </a>
      </Link>

      <div className={styles.settingsAndAngle}>
        {creatorId === currentUser && (
          <Link href={`/board/${id}`}>
            <a>
              <FaCog size={22} />
            </a>
          </Link>
        )}
        {adjustable ? (
          <p>{angles[0] + '° - ' + angles[angles.length - 1] + '°'}</p>
        ) : (
          <p>{angles[0]}°</p>
        )}
      </div>
    </div>
  );
};
