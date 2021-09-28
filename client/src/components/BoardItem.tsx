import { useApolloClient } from '@apollo/client';
import Link from 'next/link';
import { BoardCoreFragment } from '../generated/graphql';
import styles from '../styles/BoardItem.module.scss';

interface Props {
  board: BoardCoreFragment;
}

export const BoardItem = ({ board }: Props) => {
  const { title, angles, adjustable, currentLayout, location, id } = board;
  const apolloClient = useApolloClient();
  const handleClick = () => {
    apolloClient.cache.evict({ fieldName: 'getProblems' });
  };
  return (
    <>
      <Link href={`/boards/${id}`}>
        <a onClick={handleClick}>
          <div className={styles.boardItem}>
            <div className={styles.titleDiv}>
              <p className={styles.title}>{title}</p>
              <p>{currentLayout?.title}</p>
              {location && <p>{location}</p>}
            </div>
            <div className={styles.gradeAndRating}>
              {adjustable ? (
                <p>{angles[0] + '° - ' + angles[angles.length - 1] + '°'}</p>
              ) : (
                <p>{angles[0]}°</p>
              )}
            </div>
          </div>
        </a>
      </Link>
    </>
  );
};
