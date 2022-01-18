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
import { FaPlusSquare, FaSyncAlt } from 'react-icons/fa';
import { useSorting } from '../../../hooks/useSorting';
import { SortButton } from '../../../components/Button/SortButton';
import { useEffect, useRef } from 'react';
import { Searchbar } from '../../../components/Searchbar';
import { useSearch } from '../../../hooks/useSearch';

const limit = 18;
const Problems = () => {
  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';

  const didMountRef = useRef(false);
  const [searchPattern, setSearchPattern, searchRef] = useSearch();
  const [
    { selectedOrder, selectedSort, offsetRef, gradeStateRef },
    { toggleDateSort, resetSort, toggleGradeSort },
  ] = useSorting();

  const initialOptions = {
    limit,
    cursor: null,
    offset: 0,
    boardId,
    order: selectedOrder.current === 'ASC',
    sort: selectedSort.current,
  };

  const { data, loading, error, fetchMore, client, refetch } =
    useGetProblemsQuery({
      variables: {
        options: initialOptions,
      },
      notifyOnNetworkStatusChange: true,
    });

  useEffect(() => {
    if (didMountRef.current) {
      resetSort();
      if (searchPattern.length === 0) {
        refetch({
          options: initialOptions,
        });
      } else {
        refetch({
          options: {
            ...initialOptions,
            searchPattern,
          },
        });
      }
    } else {
      didMountRef.current = true;
    }
  }, [searchPattern]);

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
        <div className={styles.toolbar}>
          <Searchbar
            setSearchPattern={setSearchPattern}
            searchRef={searchRef}
          />
          <div className={styles.sortButtons}>
            <SortButton
              toggleSort={toggleDateSort}
              state={selectedSort}
              order={selectedOrder}
              client={client}
            />
            <SortButton
              toggleSort={toggleGradeSort}
              state={gradeStateRef}
              client={client}
            />
          </div>
        </div>
        {meData?.me &&
        data?.getProblems.problems.length === 0 &&
        searchPattern.length === 0 ? (
          <div className={styles.createProblem}>
            <Link href={`/boards/${boardId}/create-problem`}>
              <a className='btn'>Create First Problem</a>
            </Link>
          </div>
        ) : data?.getProblems.problems.length === 0 &&
          searchPattern.length !== 0 ? (
          <div className={styles.createProblem}>
            <p className={styles.searchFailed}>
              No problems found containing "{searchPattern}"
            </p>
          </div>
        ) : null}

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
