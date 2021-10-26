import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import { FaCog } from 'react-icons/fa';
import { BoardCoreFragment } from '../generated/graphql';
import styles from '../styles/BoardItem.module.scss';

interface Props {
  board: BoardCoreFragment;
  currentUser?: string;
}

export const BoardItem = ({ board, currentUser }: Props) => {
  const { title, angles, adjustable, city, country, id, creatorId } = board;
  const apolloClient = useApolloClient();
  const handleClick = () => {
    apolloClient.cache.evict({ fieldName: 'getProblems' });
  };

  return (
    <div className={styles.boardItem}>
      <Link href={`/boards/${id}`}>
        <a onClick={handleClick} className={styles.main}>
          <div>
            <p className={styles.title}>{title}</p>
            <p>{city + ', ' + country}</p>
          </div>
        </a>
      </Link>

      <div className={styles.right}>
        {adjustable ? (
          <p>{angles[0] + '° - ' + angles[angles.length - 1] + '°'}</p>
        ) : (
          <p>{angles[0]}°</p>
        )}
        {creatorId === currentUser && (
          <Link href={`/board/${id}`}>
            <a>
              <FaCog size={26} />
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
