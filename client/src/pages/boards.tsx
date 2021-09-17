import withApollo from '../utils/withApollo';
import { Layout } from '../components/Layout';
import { BoardItem } from '../components/BoardItem';
import { useGetBoardsQuery } from '../generated/graphql';
import styles from '../styles/Problems.module.scss';
export const Boards = () => {
  const { data, loading, error } = useGetBoardsQuery();

  if (!loading && !data) {
    return <div>{error?.message}</div>;
  }
  return (
    <Layout title='Boards'>
      <div className={styles.problems}>
        <div>
          {loading && !data ? (
            <div>loading...</div>
          ) : (
            data!.getBoards.map((board, idx) =>
              // Invalidating board in cache makes it null
              !board ? null : <BoardItem key={idx} board={board} />
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Boards);
