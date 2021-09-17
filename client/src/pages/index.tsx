import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useMeQuery } from '../generated/graphql';
import withApollo from '../utils/withApollo';

const Home: NextPage = () => {
  const router = useRouter();
  const { data } = useMeQuery();
  useEffect(() => {
    if (data?.me) router.push('/boards');
  });
  return (
    <Layout>
      <h1>Welcome</h1>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Home);
