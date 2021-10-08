import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { LayoutItem } from '../../components/LayoutItem';
import { Spinner } from '../../components/Spinner';
import { useGetBoardQuery, useGetLayoutsQuery } from '../../generated/graphql';
import withApollo from '../../utils/withApollo';
import styles from '../../styles/Board.module.scss';
import { BoardForm } from '../../components/Form/BoardForm';

const Board = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data, loading, error } = useGetBoardQuery({
    variables: { boardId },
  });
  const { data: layoutData } = useGetLayoutsQuery({
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
        <div>
          <h1>{title} Settings</h1>
          <BoardForm editProps={editProps} />
        </div>
        <div className={styles.layouts}>
          {' '}
          <h1>Layouts</h1>
          {layoutData?.getBoardLayouts.map((layout) => (
            <LayoutItem layout={layout} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Board);
