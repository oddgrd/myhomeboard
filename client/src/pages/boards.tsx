import withApollo from '../utils/withApollo';
import { Layout } from '../components/Layout';
import Link from 'next/link';
import { BoardItem } from '../components/BoardItem';
import { useGetBoardsQuery, useMeQuery } from '../generated/graphql';
import styles from '../styles/Problems.module.scss';
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
          {loading && !data
            ? null
            : data!.getBoards.map((board, idx) =>
                // Invalidating board in cache makes it null
                !board ? null : <BoardItem key={idx} board={board} />
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
