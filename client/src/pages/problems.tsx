import { Layout } from '../components/Layout';
import { ProblemItem } from '../components/ProblemItem';
import { useGetProblemsQuery } from '../generated/graphql';
import styles from '../styles/Problems.module.scss';
const Problems = () => {
  const { data, loading, error } = useGetProblemsQuery();
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
            data?.getProblems?.map((problem, idx) =>
              // Invalidating post in cache makes it null
              !problem ? null : <ProblemItem key={idx} problem={problem} />
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Problems;
