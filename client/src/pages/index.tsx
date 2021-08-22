import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { useGetProblemsQuery } from '../generated/graphql';

const Home: NextPage = () => {
  const { data, loading, error } = useGetProblemsQuery();
  if (!loading && !data) {
    return <div>{error?.message}</div>;
  }
  return (
    <Layout>
      <h1>Hello World</h1>
      <div>
        {loading && !data ? (
          <div>loading...</div>
        ) : (
          data?.getProblems?.map((p) =>
            // Invalidating post in cache makes it null
            !p ? null : <p>{p.title}</p>
          )
        )}
      </div>
    </Layout>
  );
};

export default Home;
