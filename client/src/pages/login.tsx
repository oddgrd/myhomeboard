import GoogleButton from 'react-google-button';
import { Layout } from '../components/Layout';
import styles from '../styles/Login.module.scss';

const Login = () => {
  const handleLogin = () => {
    window.open(`http://localhost:4000/api/auth/google`, '_self');
  };

  return (
    <Layout title='Login'>
      <div className={styles.login}>
        <h1>Register or Sign In</h1>
        <GoogleButton onClick={handleLogin} />
        <i>*Only preapproved google accounts are currently able to register</i>
      </div>
    </Layout>
  );
};

export default Login;
