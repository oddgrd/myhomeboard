import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '../../../components/Layout';
import { ProblemItem } from '../../../components/ProblemItem';
import { Spinner } from '../../../components/Spinner';
import {
  useGetBoardQuery,
  useGetProblemsQuery,
  useMeQuery
} from '../../../generated/graphql';
import styles from '../../../styles/Problems.module.scss';
import withApollo from '../../../utils/withApollo';

const Problems = () => {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : '';

  const { data, loading, error, fetchMore, variables } = useGetProblemsQuery({
    variables: {
      limit: 20,
      cursor: null,
      boardSlug: slug as string
    },
    notifyOnNetworkStatusChange: true
  });
  const {
    data: boardData,
    loading: boardLoading,
    error: boardError
  } = useGetBoardQuery({
    variables: {
      slug
    }
  });
  const { data: meData } = useMeQuery();

  // -- Todo: clean this up
  if (error || boardError) {
    return (
      <Layout title='Problems'>{error?.message || boardError?.message}</Layout>
    );
  }

  if (!boardLoading && !boardData?.getBoard) {
    return (
      <Layout title='Problems'>
        <p>Board Not Found</p>
        <Link href='/boards'>
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </Layout>
    );
  }
  if (!boardLoading && !boardData?.getBoard.currentLayout) {
    return (
      <Layout title='Problems'>
        <p>
          No layouts found,{' '}
          <Link href={`/boards/${slug}/create-layout`}>
            <a className={styles.back}>create one!</a>
          </Link>
        </p>
      </Layout>
    );
  }

  return (
    <Layout title='Problems'>
      <div className={styles.problems}>
        {meData?.me && data?.getProblems.problems.length === 0 && (
          <div className={styles.createProblem}>
            <Link href={`/boards/${slug}/create-problem`}>
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
                  boardSlug: slug as string,
                  limit: variables?.limit,
                  cursor:
                    data.getProblems.problems[
                      data.getProblems.problems.length - 1
                    ].createdAt
                }
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
