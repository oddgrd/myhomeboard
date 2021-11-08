import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Layout';
import { ProblemItem } from '../../../components/ListItem/ProblemItem';
import { Spinner } from '../../../components/Spinner';
import {
  useGetBoardQuery,
  useGetProblemsQuery,
  useMeQuery,
} from '../../../generated/graphql';
import styles from '../../../styles/Problems.module.scss';
import withApollo from '../../../utils/withApollo';
import { FaPlusSquare } from 'react-icons/fa';

const Problems = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';

  const { data, loading, error, fetchMore, variables } = useGetProblemsQuery({
    variables: {
      limit: 20,
      cursor: null,
      boardId,
    },
    notifyOnNetworkStatusChange: true,
  });
  const {
    data: boardData,
    loading: boardLoading,
    error: boardError,
  } = useGetBoardQuery({
    variables: {
      boardId,
    },
  });
  const { data: meData } = useMeQuery();

  if (error || boardError) {
    return (
      <Layout title='Problems'>
        <p className='centerText'>Something went wrong, try again </p>
        <button
          className='btn btn-link'
          onClick={() => {
            router.reload();
          }}
        />
      </Layout>
    );
  }
  if (!boardLoading && !boardData?.getBoard) {
    return (
      <Layout title='Problems'>
        <p className='centerText'>Board Not Found</p>
        <Link href='/boards'>
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }
  if (!boardLoading && !boardData?.getBoard.currentLayout) {
    return (
      <Layout title='Problems'>
        <p className='centerText'>
          No layouts found,{' '}
          <Link href={`/boards/${boardId}/create-layout`}>
            <a className={styles.back}>create one!</a>
          </Link>
        </p>
      </Layout>
    );
  }

  return (
    <Layout
      title='Problems'
      navTitle={boardData?.getBoard.title}
      navChildren={
        <Link href={`/boards/${boardId}/create-problem`}>
          <a
            className='btn btn-link btn-icon'
            aria-label='Create problem'
            title='Create Problem'
          >
            <FaPlusSquare size={28} />
          </a>
        </Link>
      }
    >
      <div className={styles.problems}>
        {meData?.me && data?.getProblems.problems.length === 0 && (
          <div className={styles.createProblem}>
            <Link href={`/boards/${boardId}/create-problem`}>
              <a className='btn'>Create First Problem</a>
            </Link>
          </div>
        )}
        <div>
          {loading && !data ? (
            <Spinner />
          ) : (
            data!.getProblems.problems.map((problem, idx) =>
              // Invalidating problem in cache makes it null
              !problem ? null : <ProblemItem key={idx} problem={problem} />
            )
          )}
        </div>
      </div>
      {
        // Cursor pagination
        data && data.getProblems.hasMore ? (
          <button
            className={'btn btn-fetchMore'}
            onClick={() => {
              fetchMore({
                variables: {
                  boardId,
                  limit: variables?.limit,
                  cursor:
                    data.getProblems.problems[
                      data.getProblems.problems.length - 1
                    ].createdAt,
                },
              });
            }}
          >
            Load More
          </button>
        ) : null
      }
    </Layout>
  );
};

export default withApollo({ ssr: true })(Problems);
