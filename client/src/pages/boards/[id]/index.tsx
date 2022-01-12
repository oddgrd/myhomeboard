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
  FaHourglassEnd,
  FaHourglassStart,
  FaPlusSquare,
  FaSyncAlt,
} from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const Problems = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';
  const [order, setOrder] = useState('DESC');
  const selectedOrder = useRef('DESC');

  useEffect(() => {
    selectedOrder.current = window.localStorage.getItem('order') || 'DESC';
    setOrder(selectedOrder.current);
  }, []);
  useEffect(() => {
    window.localStorage.setItem('order', selectedOrder.current);
  }, [order]);

  const toggleOrder = () => {
    selectedOrder.current = selectedOrder.current === 'DESC' ? 'ASC' : 'DESC';
    setOrder(selectedOrder.current);
    client.cache.evict({ fieldName: 'getProblems' });
  };

  const { data, loading, error, fetchMore, variables, refetch, client } =
    useGetProblemsQuery({
      variables: {
        limit: 15,
        cursor: null,
        boardId,
        order: selectedOrder.current === 'ASC',
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
            onClick={() => refetch()}
            className='btn btn-link btn-icon btn-rotate'
            aria-label='Create problem'
            title='Create Problem'
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
          <p>Sort |</p>
          <button
            className={'btn btn-icon btn-rotate btn-right'}
            onClick={() => {
              toggleOrder();
            }}
          >
            {selectedOrder.current === 'DESC' ? (
              <FaHourglassStart size={24} />
            ) : (
              <FaHourglassEnd size={24} />
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
                  order: selectedOrder.current === 'ASC',
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
