import GoogleButton from 'react-google-button';
import { Layout } from '../components/Layout';

const Login = () => {
  const handleLogin = () => {
    window.open(`http://localhost:4000/api/auth/google`, '_self');
  };

  return (
    <Layout title='Login'>
      <GoogleButton onClick={handleLogin} />
    </Layout>
  );
};

export default Login;
