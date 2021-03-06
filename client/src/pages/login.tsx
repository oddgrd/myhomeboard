import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { Layout } from '../components/Layout';
import { useMeQuery } from '../generated/graphql';
import styles from '../styles/Login.module.scss';
import withApollo from '../utils/withApollo';

const callbackUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_GOOGLE_CALLBACK
    : 'http://localhost:4000/api/auth/google';

const Login = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  const handleLogin = () => {
    window.open(callbackUrl, '_self');
  };

  useEffect(() => {
    if (data?.me) router.replace('/boards');
  }, [data?.me, router]);

  return (
    <Layout title='Login'>
      <div className={styles.login}>
        <h1>Register / Sign In</h1>
        <GoogleButton onClick={handleLogin} />
        <i>*Only preapproved google accounts are currently able to register</i>
      </div>
    </Layout>
  );
};

export default withApollo({ ssr: false })(Login);
