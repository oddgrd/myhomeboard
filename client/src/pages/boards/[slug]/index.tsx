import { Layout } from '../../../components/Layout';
import { ProblemItem } from '../../../components/ProblemItem';
import { useGetProblemsQuery } from '../../../generated/graphql';
import styles from '../../../styles/Problems.module.scss';
import withApollo from '../../../utils/withApollo';
import { useRouter } from 'next/router';

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

  if (!loading && !data) {
    return <Layout>{error?.message}</Layout>;
  }

  return (
    <Layout title='Problems'>
      <div className={styles.problems}>
        <div>
          {loading && !data ? (
            <div></div>
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
