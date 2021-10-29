import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { LayoutItem } from '../../components/LayoutItem';
import { Spinner } from '../../components/Spinner';
import {
  useGetBoardQuery,
  useGetBoardLayoutsQuery,
} from '../../generated/graphql';
import withApollo from '../../utils/withApollo';
import styles from '../../styles/Board.module.scss';
import { BoardForm } from '../../components/Form/BoardForm';
import { FaPlusSquare } from 'react-icons/fa';

const Board = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';
  const { data, loading, error } = useGetBoardQuery({
    variables: { boardId },
  });
  const { data: layoutData } = useGetBoardLayoutsQuery({
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
      <div className={styles.board}>
        <div>
          <h1>{title} Settings</h1>
          <BoardForm editProps={editProps} />
        </div>
        <div className={styles.layouts}>
          {' '}
          <div className={styles.layoutsHeader}>
            <h1>Layouts</h1>
            <Link href={`/boards/${boardId}/create-layout`}>
              <a className='btn btn-icon btn-create'>
                <FaPlusSquare size={26} />
              </a>
            </Link>
          </div>
          {layoutData && layoutData.getBoardLayouts.length > 0 ? (
            layoutData.getBoardLayouts.map((layout, idx) => (
              <LayoutItem layout={layout} key={idx} />
            ))
          ) : (
            <h3>N/A</h3>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Board);
