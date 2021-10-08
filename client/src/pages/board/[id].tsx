import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { Spinner } from '../../components/Spinner';
import { useGetBoardQuery } from '../../generated/graphql';
import withApollo from '../../utils/withApollo';
import styles from '../../styles/Board.module.scss';
import { BoardForm } from '../../components/Form/BoardForm';

const Board = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data, loading, error } = useGetBoardQuery({
    variables: { boardId },
  });

  if (error) {
    return <Layout>{error.message}</Layout>;
  }
  if (loading && !data?.getBoard) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  if (!data?.getBoard) {
    return (
      <Layout>
        <p>Board Not Found</p>
        <Link href='/'>
          <a className='back'>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }

  const { title, city, country, angles, description, adjustable, id } =
    data.getBoard;

  const editProps = {
    boardId: id,
    title,
    city,
    country,
    angles: angles.join(', '),
    description,
    adjustable,
  };

  return (
    <Layout title='Title here'>
      <div className={styles.content}>
        <h1>{title} Settings</h1>
        <BoardForm editProps={editProps} />
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Board);
