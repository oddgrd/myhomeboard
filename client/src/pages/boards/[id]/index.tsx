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
import { useEffect, useRef } from 'react';
import { Searchbar } from '../../../components/Searchbar';
import { useSearch } from '../../../hooks/useSearch';
import { useInView } from 'react-intersection-observer';
import { SortMenu } from '../../../components/SortMenu';
import { sortOptions } from '../../../assets/selectOptions';

const limit = 18;
const Problems = () => {
  const didMountRef = useRef(false);
  const [searchPattern, setSearchPattern, searchRef] = useSearch();
  const [{ selectedSort, offsetRef }, { selectSort }] = useSorting();

  const router = useRouter();
  const boardId = typeof router.query.id === 'string' ? router.query.id : '';

  const initialOptions = {
    limit,
    offset: 0,
    boardId,
    sort: selectedSort.current,
  };

  const { data, loading, error, fetchMore, client, refetch } =
    useGetProblemsQuery({
      variables: {
        options: initialOptions,
      },
      notifyOnNetworkStatusChange: true,
      skip: !router.isReady,
    });

  const { data: meData } = useMeQuery();

  const { data: boardData, error: boardError } = useGetBoardQuery({
    variables: {
      boardId,
    },
    skip: !router.isReady,
  });

  const { ref, inView } = useInView({
    rootMargin: '300px 0px',
  });

  useEffect(() => {
    if (inView) getMore();
  }, [inView]);

  const getMore = () => {
    offsetRef.current += limit;
    fetchMore({
      variables: {
        options: {
          ...initialOptions,
          offset: offsetRef.current,
        },
      },
    });
  };

  useEffect(() => {
    if (didMountRef.current) {
      selectSort('newest');
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

  if (error || boardError) {
    return (
      <Layout title='Problems'>
        <p className='centerText'>Something went wrong, </p>
        <button
          className='btn btn-link centerText'
          onClick={() => {
            router.reload();
          }}
        >
          try again
        </button>{' '}
      </Layout>
    );
  }

  if (boardData && !boardData?.getBoard.currentLayout) {
    return (
      <Layout title='Problems'>
        <p className='centerText'>
          No layouts found, the board creator can upload a layout in the board
          settings page.
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
              selectSort('newest');
              client.cache.evict({ fieldName: 'getProblems' });
            }}
            className='btn btn-link btn-icon btn-rotate'
            aria-label='Refresh Problems'
            title='Refresh Problems'
          >
            <FaSyncAlt size={27} />
          </button>
          {router.isReady && (
            <Link href={`/boards/${boardId}/create-problem`}>
              <a
                className='btn btn-link btn-icon'
                aria-label='Create problem'
                title='Create Problem'
              >
                <FaPlusSquare size={28} />
              </a>
            </Link>
          )}
        </>
      }
    >
      <div className={styles.problems}>
        <div className={styles.toolbar}>
          <Searchbar
            setSearchPattern={setSearchPattern}
            searchRef={searchRef}
          />

          <SortMenu
            disabled={searchRef.current.length > 0}
            placeholder='Sort'
            sortState={selectedSort.current}
            selectSort={selectSort}
            width={120}
            options={sortOptions}
            client={client}
          />
        </div>
        {meData?.me &&
        data?.getProblems.problems.length === 0 &&
        searchPattern.length === 0 ? (
          <div className={styles.createProblem}>
            {router.isReady ? (
              <Link href={`/boards/${boardId}/create-problem`}>
                <a className='btn'>Create First Problem</a>
              </Link>
            ) : (
              <p>No problems found</p>
            )}
          </div>
        ) : data?.getProblems.problems.length === 0 &&
          searchPattern.length !== 0 ? (
          <div className={styles.createProblem}>
            <p className={styles.searchFailed}>
              No problems found containing &#34;{searchPattern}&#34;
            </p>
          </div>
        ) : null}
        <div>
          {loading && !data ? (
            <Spinner />
          ) : data ? (
            data.getProblems.problems.map((problem, idx) =>
              // Invalidating problem in cache makes it null
              !problem ? null : (
                <ProblemItem
                  key={idx}
                  problem={problem}
                  userId={meData?.me?.id}
                />
              )
            )
          ) : null}
        </div>
      </div>
      {
        // infinite scroll div
        data && data.getProblems.hasMore ? (
          <button
            ref={ref}
            onClick={() => getMore()}
            className='btn btn-fetchMore'
          >
            Load More
          </button>
        ) : null
      }
    </Layout>
  );
};

export default withApollo({ ssr: false })(Problems);
