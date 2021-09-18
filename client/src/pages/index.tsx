import type { NextPage } from 'next';
import { Layout } from '../components/Layout';
import withApollo from '../utils/withApollo';

const Home: NextPage = () => {
  return (
    <Layout>
      <h1>Welcome</h1>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Home);
