import { Layout } from '../components/Layout';
import { ProblemItem } from '../components/ProblemItem';
import { useGetProblemsQuery } from '../generated/graphql';
import styles from '../styles/Problems.module.scss';
import withApollo from '../utils/withApollo';

const Problems = () => {
  const { data, loading, error, fetchMore, variables } = useGetProblemsQuery({
    variables: { limit: 15, cursor: null },
    notifyOnNetworkStatusChange: true
  });
  if (!loading && !data) {
    return <div>{error?.message}</div>;
  }
  return (
    <Layout title='Problems'>
      <div className={styles.problems}>
        <div>
          {loading && !data ? (
            <div>loading...</div>
          ) : (
            data!.getProblems.problems.map((problem, idx) =>
              // Invalidating post in cache makes it null
              !problem ? null : <ProblemItem key={idx} problem={problem} />
            )
          )}
        </div>
      </div>
      {
        // Cursor pagination
        data && data.getProblems.hasMore ? (
          <button
            className='btn'
            onClick={() => {
              fetchMore({
                variables: {
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
