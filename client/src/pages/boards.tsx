import Link from 'next/link';
import { BoardItem } from '../components/BoardItem';
import { Layout } from '../components/Layout';
import { Spinner } from '../components/Spinner';
import { useGetBoardsQuery, useMeQuery } from '../generated/graphql';
import styles from '../styles/Problems.module.scss';
import withApollo from '../utils/withApollo';

export const Boards = () => {
  const { data, loading, error } = useGetBoardsQuery();
  const { data: meData } = useMeQuery();

  if (!loading && !data) {
    return <Layout>{error?.message}</Layout>;
  }
  return (
    <Layout title='Boards'>
      <div className={styles.problems}>
        <div>
          {loading && !data ? (
            <Spinner />
          ) : (
            data!.getBoards.map((board, idx) =>
              // Invalidating board in cache makes it null
              !board ? null : <BoardItem key={idx} board={board} currentUser={meData?.me?.id} />
            )
          )}
        </div>
        {meData?.me && (
          <div className={styles.createBoard}>
            <Link href='/create-board'>
              <strong className='btn'>Add New Board</strong>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Boards);
