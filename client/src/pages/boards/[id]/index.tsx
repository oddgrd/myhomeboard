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
import {
  FaClock,
  FaDiceOne,
  FaDiceSix,
  FaDiceThree,
  FaPlusSquare,
  FaRegClock,
  FaSyncAlt,
} from 'react-icons/fa';
import { useSorting } from '../../../hooks/useSorting';

const limit = 15;
const Problems = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';

  const [
    { selectedOrder, selectedSort, offsetRef, gradeStateRef },
    { setOffset, toggleDateSort, resetSort, toggleGradeSort },
  ] = useSorting();

  const { data, loading, error, fetchMore, client } = useGetProblemsQuery({
    variables: {
      options: {
        limit,
        cursor: null,
        offset: 0,
        boardId,
        order: selectedOrder.current === 'ASC',
        sort: selectedSort.current,
      },
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
        <p className='centerText'>
          Something went wrong,{' '}
          <button
            className='btn btn-link'
            onClick={() => {
              router.reload();
            }}
          >
            try again
          </button>{' '}
        </p>
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
        <>
          <button
            onClick={() => {
              resetSort();
              client.cache.evict({ fieldName: 'getProblems' });
            }}
            className='btn btn-link btn-icon btn-rotate'
            aria-label='Refresh Problems'
            title='Refresh Problems'
          >
            <FaSyncAlt size={27} />
          </button>

          <Link href={`/boards/${boardId}/create-problem`}>
            <a
              className='btn btn-link btn-icon'
              aria-label='Create problem'
              title='Create Problem'
            >
              <FaPlusSquare size={28} />
            </a>
          </Link>
        </>
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
        <div className={styles.toolbar}>
          <button
            className={'btn btn-icon btn-right'}
            aria-label='Toggle Date Sort'
            title='Toggle Date Sort'
            onClick={() => {
              toggleDateSort();
              client.cache.evict({ fieldName: 'getProblems' });
            }}
          >
            {selectedOrder.current === 'DESC' ||
            selectedSort.current === 'GRADE' ? (
              <FaClock size={26} />
            ) : (
              <FaRegClock size={26} />
            )}
          </button>
          <button
            className={'btn btn-icon btn-right'}
            aria-label='Toggle Grade Sort'
            title='Toggle Grade Sort'
            onClick={() => {
              toggleGradeSort();
              client.cache.evict({ fieldName: 'getProblems' });
            }}
          >
            {gradeStateRef.current === 0 ? (
              <FaDiceThree size={26} />
            ) : gradeStateRef.current === 1 ? (
              <FaDiceSix size={26} />
            ) : (
              <FaDiceOne size={26} />
            )}
          </button>
        </div>

        <div>
          {loading && !data ? (
            <Spinner />
          ) : (
            data!.getProblems.problems.map((problem, idx) =>
              // Invalidating problem in cache makes it null
              !problem ? null : (
                <ProblemItem
                  key={idx}
                  problem={problem}
                  userId={meData?.me?.id}
                />
              )
            )
          )}
        </div>
      </div>
      {
        // Cursor pagination when sorting by date,
        // offset/limit when sorting by grade
        data && data.getProblems.hasMore ? (
          <button
            className={'btn btn-fetchMore'}
            onClick={() => {
              offsetRef.current += limit;
              setOffset(offsetRef.current);
              fetchMore({
                variables: {
                  options: {
                    boardId,
                    limit,
                    sort: selectedSort.current,
                    cursor:
                      data.getProblems.problems[
                        data.getProblems.problems.length - 1
                      ].createdAt,
                    order: selectedOrder.current === 'ASC',
                    offset: offsetRef.current,
                  },
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
