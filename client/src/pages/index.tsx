import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import { useGetProblemsQuery } from '../generated/graphql';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Welcome</h1>
    </Layout>
  );
};

export default Home;
